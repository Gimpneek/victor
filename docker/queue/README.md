# Before running
- Get the RabbitMQ docker image, run it in daemon mode and port forward 5672 & 15672 via:
`docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq`
- `pip install -r requirements.txt`
- Run consumer.py
- Run producer.py as many times as you want in a separate terminal
