from flask import Flask, request
from github import Github
import os
import requests
import urlparse
app = Flask(__name__)

CLIENT_ID=os.environ.get('CLIENTID')
CLIENT_SECRET=os.environ.get('CLIENTSECRET')

@app.route('/')
def homepage():
	return '<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id={0}">Sign in with GitHub</a>'.format(CLIENT_ID)

@app.route('/callback', methods=['GET'])
def repos():
	session_code = request.args.get('code')
	get_access_token = requests.post('https://github.com/login/oauth/access_token',
	                                 data={
		                                 'client_id': CLIENT_ID,
		                                 'client_secret': CLIENT_SECRET,
		                                 'code': session_code,
		                                 'accept': 'application/json'
	                                 })
	access_token = urlparse.parse_qs(get_access_token.content).get('access_token')[0]
	g = Github(login_or_token=access_token)
	repos = ''
	for repo in g.get_user().get_repos():
		repos += '<li>{0}</li>'.format(repo.name)
	return '<ul>{0}</ul>'.format(repos)


if __name__ == "__main__":
	app.run(port=8000)
