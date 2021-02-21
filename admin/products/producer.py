import pika
import json

# コネクション、チャンネル作成
params = pika.ConnectionParameters("rabbitmq")
connection = pika.BlockingConnection(params)
channel = connection.channel()


# メッセージ送信
def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(
        exchange="", routing_key="main", body=json.dumps(body), properties=properties
    )
