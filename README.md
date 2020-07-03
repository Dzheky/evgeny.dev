# Evgeny.dev - my personal website

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

(To do - add explanation for each .env variable)