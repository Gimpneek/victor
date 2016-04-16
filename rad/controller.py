from flask import Flask
from flask import render_template
from flask.ext.bower import Bower
from behave.runner import Runner
from behave.configuration import Configuration, ConfigError
import os
# Create Application
app = Flask(__name__)
Bower(app)
script_path = os.path.dirname(os.path.realpath(__file__))


class OutputStream(object):

    def __init__(self, filename):
        self.filename = filename
        self.stream = None

    def open(self):
        stream = open(self.filename, 'w')
        self.stream = stream
        return stream

    def close(self):
        pass

    def read(self):
        return open(self.filename, 'r').read()


@app.route('/', methods=['GET'])
def homepage():
    path_root = '{0}/features/'.format(script_path)
    config = Configuration(paths=[path_root], steps_dir='{0}steps/'.format(path_root))
    config.format = [config.default_format]
    runner = Runner(config)
    runner.run()
    return render_template('base.html', features=runner.features)


@app.route('/features', methods=['GET'])
def features():
    path_root = '{0}/features/'.format(script_path)
    config = Configuration(paths=[path_root],
                           steps_dir='{0}steps/'.format(path_root))
    # config.format = [config.default_format]
    # config.outputs = ['features']
    config.format = ['json']
    feature_file = OutputStream('features')
    config.outputs = [feature_file]
    runner = Runner(config)
    runner.run()
    feature_output = feature_file.read()
    return feature_output + ']'

if __name__ == "__main__":
    app.run(port=8000)
