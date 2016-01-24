from flask import Flask
from flask import request
from flask import make_response
from flask import redirect
from flask import render_template
from flask import g
from github import Github
from github import BadCredentialsException
from github import UnknownObjectException
import os
import requests
import urlparse
import sqlite3

# Create Application
app = Flask(__name__)

# Configuration
CLIENT_ID = os.environ.get('CLIENTID')
CLIENT_SECRET = os.environ.get('CLIENTSECRET')
DATABASE = os.path.join(app.root_path, 'database.db')
DEBUG = False
SECRET_KEY = 'dev key'
USERNAME = 'admin'
PASSWORD = 'admin'
app.config.from_object(__name__)


def connect_db():
    return sqlite3.connect(app.config['DATABASE'])


@app.before_request
def before_request():
    g.db = connect_db()


@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()


@app.route('/', methods=['GET'])
def homepage():
    # Check if we have an access token, if not redirect to login page
    access_token = request.cookies.get('gat')
    if access_token:
        github = Github(login_or_token=access_token)
        user = github.get_user()
        repos = user.get_repos()
        active_repos = []
        # Check to see if GitHub user already has an account in database
        check_cur = g.db.execute(
                'select id from user where github_id = ?',
                [user.id]
        )
        existing_user = check_cur.fetchone()
        # If not create one and set flag to show first login page
        if not existing_user:
            add_user = g.db.execute(
                    'insert into user (github_id) values (?)',
                    [user.id]
            )
            g.db.commit()
            user_id = add_user.lastrowid
            for repo in repos:
                g.db.execute(
                        'insert into repo (user_id, repo_id) values (?, ?)',
                        [user_id, repo.id]
                )
            g.db.commit()
        else:
            existing_user = existing_user[0]
            # grab list of the active repos for user in database
            db_act_repos = g.db.execute(
                    'select repo_id from repo where user_id = ? '
                    'and victor_active = 1',
                    [existing_user]
            )
            act_repos = [ar[0] for ar in db_act_repos.fetchall()]
            active_repos = [rp for rp in repos if rp.id in act_repos]
        # If not show off repo list
        try:
            return render_template(
                    'post_login.html',
                    user=user,
                    repos=repos,
                    active_repos=active_repos
            )
        except BadCredentialsException:
            response = make_response(
                    render_template(
                            'landing_page.html',
                            github_client_id=CLIENT_ID
                    )
            )
            response.set_cookie('gat', '', expires=0)
            return response
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

    # get user id
    check_cur = g.db.execute(
            'select id from user where github_id = ?',
            [user.id]
    )
    user_check = check_cur.fetchone()
    if user_check:
        user_id = user_check[0]
        repos = user.get_repos()
        active_repos = []
        db_act_repos = g.db.execute(
                'select repo_id from repo where user_id = ? '
                'and victor_active = 1',
                [user_id]
        )
        act_repos = [ar[0] for ar in db_act_repos.fetchall()]
        active_repos = [rp for rp in repos if rp.id in act_repos]

        requested_account = github.get_user(github_account)
        requested_repo = requested_account.get_repo(repo)
        # Read the .victor file if it has one
        try:
            victor_file = requested_repo.get_contents('.victor.yml').decoded_content
        except UnknownObjectException:
            victor_file = None
        return render_template(
                'repo_homepage.html',
                user=user,
                repos=repos,
                active_repos=active_repos,
                requested_account=requested_account,
                requested_repo=requested_repo,
                victor_file=victor_file
        )
    else:
        return make_response(redirect('/'))


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
