import requests.auth
import requests
import sys
import os
from dotenv import load_dotenv
load_dotenv()


client_id = os.getenv('client_id')
client_secret = os.getenv('client_secret')
username = os.getenv('username')
password = os.getenv('password')
user_agent = os.getenv('user_agent')

saved_content_endpoint = (
    f"https://oauth.reddit.com/user/{username}/saved"
)


def main():
    access_token = reddit_request_token()
    user_saved_posts = reddit_request_data(access_token)
    print(user_saved_posts)


def reddit_request_data(access_token):
    headers = {"Authorization": f"bearer {access_token}",
               "User-Agent": user_agent}
    oauth_url = 'https://oauth.reddit.com/api/v1/me'
    data = requests.get(oauth_url, headers=headers)
    return data


def reddit_request_token():
    client_auth = requests.auth.HTTPBasicAuth(client_id, client_secret)
    post_data = {"grant_type": "password",
                 "username":  username, "password": password}
    headers = {"User-Agent": user_agent}
    response = requests.post("https://www.reddit.com/api/v1/access_token",
                             auth=client_auth, data=post_data, headers=headers)
    res_json = response.json()

    return res_json["access_token"]


def return_saved():
    pass


if __name__ == '__main__':
    sys.exit(main())
