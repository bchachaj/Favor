import requests.auth
import requests
import sys
import os
import json
import pickle
import praw
from dotenv import load_dotenv
load_dotenv()


client_id = os.getenv('client_id')
client_secret = os.getenv('client_secret')
username = os.getenv('username')
password = os.getenv('password')
user_agent = os.getenv('user_agent')

# this endpoint is limited to 100
saved_content_endpoint = (
    # f"https://oauth.reddit.com/user/{username}/saved?limit=100"
    f"https://oauth.reddit.com/user/{username}/saved?limit=100"
)


def main():
    # access_token = reddit_request_token()
    # saved_posts = reddit_request_data(access_token)
    # json_res = json.dumps(saved_posts)
    # print(len(saved_posts['data']["children"]))

    # posts = saved_posts['data']["children"]
    # print(len(posts))

    reddit = praw.Reddit(client_id=client_id,
                         client_secret=client_secret,
                         password=password,
                         user_agent=user_agent,
                         username=username)
    # print(reddit.auth.url(['identity'], '...', 'permanent'))

    # print(dir(reddit.user))
    user = reddit.redditor(username)
    me = reddit.user.me()
    print(me.saved())
    print(user.saved(limit=1000))

    # for post in posts:
    # print(post)

    # for row in json_res:
    # print(len(row))
    # print(row)
    # print(json_res)


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
