# python microcamp

## Install

```
# prepare network
docker network create --driver bridge rabbitmq
docker network ls

# prepare rabbitmq
cd rabbitmq
cp .env.example .env
docker-compose up -d

# prepare admin
cd admin
cp .env.example .env
docker-compose up -d

docker-compose exec backend /bin/sh
python manage.py makemigrations
python manage.py migrate

docker-compose exec db /bin/sh
cd tmp
mysql -uroot -proot
use admin;
source init.sql
select * from products_user;

# prepare main
cd main
cp .env.example .env
docker-compose up -d
docker-compose exec backend /bin/sh

# migrationフォルダ作成
# マイグレーション用のスクリプトを生成
# マイグレーション用のスクリプトのupgradeの内容(テーブル作成)を実行
python manager.py db init
python manager.py db migrate
python manager.py db upgrade

docker-compose exec db /bin/sh
mysql -uroot -proot
use main;
show tables;

# prepare frontend
cd front
npm run dev

localhost:3000/ or localhost:3000/admin
```

## venv

```
cd admin or main

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

## Rabbit MQ

```
http://localhost:15672/
guest / guest
```
