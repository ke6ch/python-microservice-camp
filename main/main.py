from dataclasses import dataclass
from flask import Flask, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import UniqueConstraint, func, case
import requests

from producer import publish

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@db/main"

CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)


@dataclass
class Product(db.Model):
    id: int
    title: str
    image: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))


@dataclass
class ProductUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    UniqueConstraint("user_id", "product_id", name="user_product_unique")


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ("id", "title", "image", "likes")


@app.route("/api/products")
def index():
    # product_userからlikeの数を取得
    sub_query = (
        db.session.query(
            ProductUser.product_id, func.count(ProductUser.product_id).label("likes")
        )
        .group_by(ProductUser.product_id)
        .subquery("pu")
    )

    # productとproduct_user(pu)を外部結合してデータを取得
    main_query = db.session.query(
        Product.id.label("id"),
        Product.title.label("title"),
        Product.image.label("image"),
        case(
            [
                (sub_query.c.likes == None, 0),  # noqa: E711
            ],
            else_=sub_query.c.likes,
        ).label("likes"),
    ).outerjoin(sub_query, sub_query.c.product_id == Product.id)

    products_schema = ProductSchema(many=True)
    return jsonify(products_schema.dump(main_query.all()))


@app.route("/api/products/<int:id>/like", methods=["POST"])
def like(id):
    # https://docs.docker.jp/docker-for-mac/networking.html#mac-i-want-to-connect-from-a-container-to-a-service-on-the-host
    req = requests.get("http://host.docker.internal:8000/api/user")
    json = req.json()

    try:
        productUser = ProductUser(user_id=json["id"], product_id=id)
        db.session.add(productUser)
        db.session.commit()

        publish("product_liked", id)
    except:  # noqa: E722
        abort(400, "You already liked this product")

    return jsonify({"message": "success"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
