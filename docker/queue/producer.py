import pika

connection = pika.BlockingConnection()
channel = connection.channel()
channel.queue_declare(queue='victor')

message = '{"name": "A Job"}'
print('---> message out {}'.format(message))
channel.basic_publish(exchange='',
                      routing_key='victor',
                      body=message)
connection.close()