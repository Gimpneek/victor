from flask import Flask, request, make_response, redirect, render_template
from github import Github
import os
import requests
import urlparse
app = Flask(__name__)

CLIENT_ID = os.environ.get('CLIENTID')
CLIENT_SECRET = os.environ.get('CLIENTSECRET')


@app.route('/', methods=['GET'])
def homepage():
	# Check if we have an access token, if not redirect to login page
	access_token = request.cookies.get('gat')
	if access_token:
		github = Github(login_or_token=access_token)
		user = github.get_user()
		repos = user.get_repos()
		return render_template('post_login.html', user=user, repos=repos)
	else:
		return render_template('landing_page.html', github_client_id=CLIENT_ID)


@app.route('/<github_account>/<repo>', methods=['GET'])
def repo_homepage(github_account=None, repo=None):
	# Check if we have access token, repo and account, if not redirect to login
	access_token = request.cookies.get('gat')
	if not github_account or not repo or not access_token:
		return make_response(redirect('/'))
	# Get the logged in, repos for that user, requested account and repo
	github = Github(login_or_token=access_token)
	user = github.get_user()
	repos = user.get_repos()
	requested_account = github.get_user(github_account)
	requested_repo = requested_account.get_repo(repo)

	# Read the .victor file if it has one
	try:
		victor_file = requested_repo.get_contents('.victor.yml').decoded_content
	except:
		victor_file = None
	return render_template(
			'repo_homepage.html',
			user=user,
			repos=repos,
			requested_account=requested_account,
			requested_repo=requested_repo,
			victor_file=victor_file
	)


@app.route('/callback', methods=['GET'])
def githubcallback():
	session_code = request.args.get('code')
	get_access_token = requests.post(
			'https://github.com/login/oauth/access_token',
			data={
				'client_id': CLIENT_ID,
				'client_secret': CLIENT_SECRET,
				'code': session_code,
				'accept': 'application/json'
			}
	)
	access_token = \
		urlparse.parse_qs(get_access_token.content).get('access_token')[0]
	response = make_response(redirect('/'))
	response.set_cookie('gat', access_token)
	return response

if __name__ == "__main__":
	app.run(port=8000)
