import requests.auth
import requests
import sys
import os
import json
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
    saved_posts = reddit_request_data(access_token)
    # print(saved_posts['data'])
    json_res = json.dumps(saved_posts, indent=2)
    print(json_res)


def reddit_request_data(access_token, data_path=None):
    headers = {"Authorization": f"bearer {access_token}",
               "User-Agent": user_agent}
    fetch_url = saved_content_endpoint

    if data_path == None:
        fetch_url = saved_content_endpoint
    else:
        fetch_url = data_path

    data = requests.get(fetch_url, headers=headers)
    if(data.status_code == 200):
        return data.json()
    else:
        sys.exit(data.status_code)


def reddit_request_token():
    client_auth = requests.auth.HTTPBasicAuth(client_id, client_secret)
    post_data = {"grant_type": "password",
                 "username":  username, "password": password}
    headers = {"User-Agent": user_agent}
    response = requests.post("https://www.reddit.com/api/v1/access_token",
                             auth=client_auth, data=post_data, headers=headers)
    res_json = response.json()

    return res_json["access_token"]


if __name__ == '__main__':
    sys.exit(main())
