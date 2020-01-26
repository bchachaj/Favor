# Favor 

### A different way to export and browse 'saved' Reddit content. 

 This project entails a script which fetches your saved Reddit items (up to 1000), and is packaged with a clean user inteface which allows sorting content by subreddits of origin, and content type (comments vs. submissions). 

## Demo 
[Click here to view demo seeded with sample content](http://interesting-reading.surge.sh/)

![demo vid](images/favor_demo_vid.gif)

## Usage 
To start, acquire the client ID and secret for your particular account, details how to do so can be found here: https://github.com/reddit-archive/reddit/wiki/OAuth2

### To run script: 
Install python dependencies via `pip install`   
Edit the provided `config.env-sample` template with the auth id + secret, and your account credentials. Rename the file to `.env` and run `python main.py`. If successful it will output the number of retrieved items. 

The retrieved items are written to a text file in the root of the project, named `saved_items.txt`. To make use of the provided user interface, simply create a folder within `favor_client/public` called `saved`, and drop the file in there. 

### To work with UI
Navigate into `favor_client folder` and install dependencies via `npm install`.

To operate in dev environment, run `npm start`

To use production version, run `npm run build`. You will need a static server to run the files locally, with options such as: 

- Run `python -m http.server` (or `python3 -m http.server ` depending on install) in project directory
- Install [serve](https://www.npmjs.com/package/serve) and run in project directory


