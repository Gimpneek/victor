import pika, json

connection = pika.BlockingConnection()
channel = connection.channel()
channel.queue_declare(queue='victor')


def consumer_callback(ch, method, properties, body):
    data = json.dumps(body)
    print('received message {0} - {1} - {2} - {3}'.format(
        ch, method, properties, body
    ))


channel.basic_consume(consumer_callback, queue='victor')
channel.start_consuming()