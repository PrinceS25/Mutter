![MutterLogo](https://i.imgur.com/DTLeUIB.png)

# Mutter v2.0
Our mission is to bring people together through music and provide anyone a platform to express themselves in their own music review blog. Become a music critic and see what others have to say about top music.


### Technologies
* [React](https://reactjs.org/) - Frontend: JavaScript library for creating web apps!
* [node.js](http://nodejs.org) - Evented I/O for the backend
* [Firebase](https://firebase.google.com/) - Backend: Database and Authorization
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - For authenticating and integrating with Spotify
* [Semantic UI](https://react.semantic-ui.com/) - Frontend Framework


### Installation / Usage
There are two ways of running Mutter: 1) accessing it via webpage, or 2) running locally. It is recommended to use method 1 as it represents the web application as it would be during production. Method 2 is provided as backup in case method 1 is unavailable.

**Preferred Method** (gh-pages branch)\
Access via Website: https://princes25.github.io/Mutter/


**Backup Method** (master branch)\
Requires [node.js](https://nodejs.org/).

In order to run locally, you need to create an .env file in the root folder and define the following variables inside:
* REACT_APP_FIREBASE_API_KEY
* REACT_APP_AUTH_DOMAIN
* REACT_APP_DATABASE_URL
* REACT_APP_PROJECT_ID
* REACT_APP_STORAGE_BUCKET
* REACT_APP_MESSAGING_SENDER_ID
* REACT_APP_APP_ID
* REACT_APP_SPOTIFY_CLIENT_ID

Environmental variables REACT_APP_FIREBASE_API_KEY to REACT_APP_APP_ID can be acquired by setting up [Firebase](https://console.firebase.google.com/) for a web app. Follow [this](https://www.robinwieruch.de/firebase-tutorial) tutorial.

REACT_APP_SPOTIFY_CLIENT_ID can be acquired by going to [Spotify for Developers](https://developer.spotify.com/dashboard) and creating an app.

See [sample.env](https://github.com/PrinceS25/Mutter/blob/master/sample.env) for an example.

Clone master branch and run the script
```sh
$ git clone https://github.com/PrinceS25/Mutter
$ cd mutter
$ ./run.sh
```


### Team
* Shabnam Bahmanyar
* Henry Bui
* Brian Du
* Tejas Kasturi
* Prabhjot Singh


### Directory Structure
    mutter
    ├── ...
    ├── spotify_server      # Spotify Auhentication Server
    │   └── ...
    ├── src
    │   ├── components      # All frontend components used to display web pages 
    |   |   ├── ...
    |   |   ├── discover            # Discover Page
    |   |   ├── feed                # Feed Page
    |   |   ├── layout              # Login and Navbar
    |   |   ├── profile             # Profile Page
    |   |   ├── 404.js              # 404 Status Page 
    |   |   ├── createPost.js       # Create Post Page
    |   |   └── ...
    │   ├── config
    |   |   └── fbConfig.js         # Firebase configuration
    │   ├── store
    |   |   ├── actions             # Backend methods used to communicate with Firebase
    |   |   |   ├── authActions.js  # User Authentication
    |   |   |   └── postActions.js  # Posts Database
    │   |   ├── reducers            # Backend reducers keeping track of state changes
    |   |   |   ├── authReducer.js  
    |   |   |   ├── postReducer.js 
    |   |   |   └── rootReducer.js  # Combines Other Reducers
    │   ├── App.js      # Main Component responsible for routing
    │   ├── index.css   # Main CSS File
    │   └── ...
    ├── README.md       # The file you are currently reading
    ├── run.sh          # Bash script to run the web application
    └── ...
