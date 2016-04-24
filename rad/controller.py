from flask import Flask, send_from_directory
from flask import render_template
from behave.runner import Runner
from behave.configuration import Configuration
import os, json
# Create Application
app = Flask(__name__, static_url_path='')
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
    config = Configuration(
        steps_dir='{0}steps/'.format(path_root),
        dry_run=True)
    config.format = [config.default_format]
    config.paths = [path_root]
    runner = Runner(config)
    runner.run()
    return render_template('base.html', features=runner.features)


@app.route('/features', methods=['GET'])
def features():
    path_root = '{0}/features/'.format(script_path)
    config = Configuration(steps_dir='{0}steps/'.format(path_root))
    config.format = ['json']
    config.paths = [path_root]
    feature_file = OutputStream('features')
    config.outputs = [feature_file]
    runner = Runner(config)
    runner.run()
    feature_output = feature_file.read()
    return feature_output + ']'


@app.route('/run/scenario/<scenario>', methods=['GET'])
def run_scenario(scenario):
    path_root = '{0}/features/'.format(script_path)
    config = Configuration(steps_dir='{0}steps/'.format(path_root), name=scenario)
    config.format = ['json']
    config.paths = [path_root]
    feature_file = OutputStream('features')
    config.outputs = [feature_file]
    runner = Runner(config)
    runner.run()
    feature_output = json.loads(feature_file.read()+']')
    scenarios = []
    for feature in feature_output:
        for scen in feature['elements']:
            if scen['name'] == scenario:
                scenarios.append(scen)
    return json.dumps(scenarios)


@app.route('/run/step/<step>', methods=['GET'])
def run_step(step):
    # Create a file for the step
    with open('{0}/user_defined/test_file.feature'.format(script_path), 'w') as test_file:
        test_file.write("""
        Feature: Test Feature

            Scenario: Test Scenario
                {0}
        """.format(step))
    # Run the runner against the step
    path_root = '{0}/user_defined'.format(script_path)
    config = Configuration()
    config.format = ['json']
    config.paths = [path_root]
    config.steps_dir = '{0}/features/steps/'.format(script_path)
    feature_file = OutputStream('features')
    config.outputs = [feature_file]
    runner = Runner(config)
    runner.run()
    # Return the results
    return feature_file.read() + ']'


@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory(script_path + '/static/src/', path)


if __name__ == "__main__":
    app.run(port=8000)
