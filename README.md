![Alt text](https://i.imgur.com/7Nt9r94.png)
## Description
Serverless personal website based on React, Styled Components and Next.js. Link: https://evgeny.dev

### Features:
* *About page with links to social media:* <br>
<br/><img src="https://i.imgur.com/a0zPOAx.png" width="500" />
* *Cool animations*
<br/><img src="https://i.imgur.com/5CX8zYZ.gif" width="500" />
* *List of projects*
* *Blog posts*
* *Dashboard*
<br/><img src="https://i.imgur.com/2zLwkm8.png" width="500" />
* *Dark theme* 
<br/><img src="https://i.imgur.com/ouiiyow.gif" width="500" />

## How to start:
* Clone the repository:
    * Using ssh token: `git clone git@github.com:Dzheky/evgeny.dev.git`
    * Using https: `git clone https://github.com/Dzheky/evgeny.dev.git`
* Go to folder `cd evgeny.dev`
* Install yarn:
    * MacOS: `brew install yarn`
    * Windows: go to [link](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
    * Linux:
  ```
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update && sudo apt install yarn
  ```
* Run `yarn && yarn dev`
* Go to [link](http://localhost:4000/) `http://localhost:4000/`

### For a dashboard to properly work you should fill out all env variables.

create `.env` file in the project folder and add these environment variables:
#### UNSPLASH_ACCESS_KEY
Go to https://unsplash.com/oauth/applications and register the application, then use generated `Access Key`
#### YOUTUBE_ACCESS_KEY
To connect your YouTube please use this website https://developers.google.com/youtube/registering_an_application
and then use the generated key
#### LASTFM_ACCESS_KEY
Go to https://www.last.fm/api/ then click on `Get an API account` and register, after registration you will receive API key to use here 
#### STACKOVERFLOW_ACCESS_KEY
Register your application here https://stackapps.com/apps/oauth/register and then use the `Key`
#### BUTTONDOWN_CLIENT_KEY
Go to https://buttondown.email/settings and at the bottom of the screen you will see `Your API Key`
#### FIREBASE_ACCESS_KEY
to be added...
#### FIREBASE_CLIENT_EMAIL
to be added...
