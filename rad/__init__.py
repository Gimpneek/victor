from controller import app
import os
import logging


if not app.debug and os.environ.get('HEROKU') is None:
    from logging.handlers import RotatingFileHandler
    file_handler = RotatingFileHandler('victor.log', 'a', 1 * 1024 * 1024, 10)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('victor startup')

if os.environ.get('HEROKU') is not None:
    stream_handler = logging.StreamHandler()
    app.logger.addHandler(stream_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('victor startup')

if __name__ == '__main__':
    app.run(port=8000, debug=False)
