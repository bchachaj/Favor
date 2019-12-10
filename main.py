import requests.auth
import requests
import sys
import os
import json
import pickle
import jsonpickle
import praw
import copy

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
    reddit = praw.Reddit(client_id=client_id,
                         client_secret=client_secret,
                         password=password,
                         user_agent=user_agent,
                         username=username)

    # print(dir(reddit.user))
    # user = reddit.redditor(username)
    me = reddit.user.me()
    saved = me.saved
    saved_item_collection = []

    for saved_item in saved(limit=14):
        duped_item = copy.deepcopy(saved_item)

        # delete '_reddit' attribute to save space
        delattr(duped_item, '_reddit')

        obj_dict = duped_item.__dict__
        encoded = jsonpickle.encode(obj_dict)

        saved_item_collection.append(encoded)

    print(len(saved_item_collection))


# def reddit_request_data(access_token, data_path=None):
#     headers = {"Authorization": f"bearer {access_token}",
#                "User-Agent": user_agent}
#     fetch_url = saved_content_endpoint

#     if data_path == None:
#         fetch_url = saved_content_endpoint
#     else:
#         fetch_url = data_path

#     data = requests.get(fetch_url, headers=headers)
#     if(data.status_code == 200):
#         return data.json()
#     else:
#         sys.exit(data.status_code)


# def reddit_request_token():
#     client_auth = requests.auth.HTTPBasicAuth(client_id, client_secret)
#     post_data = {"grant_type": "password",
#                  "username":  username, "password": password}
#     headers = {"User-Agent": user_agent}
#     response = requests.post("https://www.reddit.com/api/v1/access_token",
#                              auth=client_auth, data=post_data, headers=headers)
#     res_json = response.json()

#     return res_json["access_token"]


if __name__ == '__main__':
    sys.exit(main())
#
