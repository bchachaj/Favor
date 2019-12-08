import sys
import os 
from dotenv import load_dotenv
load_dotenv()

def main():
    print('main')
    pass


def connect_to_reddit():
    auth_token = os.getenv('auth_token')
    # print(auth_token)
    pass

def return_saved(): 
    pass 

if __name__ == '__main__':
    sys.exit(main())