# acv-project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of content

- [Installation](#installation)
- [Coding style](#coding-style)
- [Repo structure](#repo-structure)
  - [Content of .env file](#content-of-env-file)
- [Sources and references](#sources-and-references)


## Installation

Add `.env` file at the root of the project. Fill neccessary information into it (contact Lam if you don't know).

In the project directory, you can run these in the terminal:

### Core commands

#### `npm install` at root and client folder

To install the neccessary dependencies. Remember to do this in both root folder and `/client` folder.

#### `npm run build` at client folder

To build static files.

#### `npm start` at client folder

To start the frontend.

#### `npm run dev` at root folder

To runs the server backend in the development mode.

After run all above commands (ideally in 2 terminals, one for frontend and one for backend), it should open a new web window at `localhost:3000` and displayed some frontpage content there.


## Coding style

Indent space: 2 (for backend) and 4 (for frontend)

Variable name: camelCase. Example: smallNumber, dateOfBirth.

Database model name: Start with uppercase. Example: User, Contact, Event.

Use `const` when require modules.


## Repo structure

```bash

|__client/  ** THIS IS EVERYTHING FROM THE REACT SIDE **
    |__ node_modules/  ** THIS BELONGS TO FRONTEND
        |__ tons of stuff...
    |__ public/
        |__ index.html
        |__ favicon.ico
        |__ etc.
    |__ src/
        |__ index.js
        |__ App.js
        |__ etc.
|__ node_modules/  ** THIS BELONGS TO BACKEND
    |__ stuff...
|__ models/
    |__ spart.js
    |__ conveyor.js
    |__ etc.
|__ config/
    |__ config.js
|__ routes
    |__ spart.js
    |__ conveyor.js
    |__ etc.
|__ .gitignore
|__ .env  ** ALTHOUGH GITIGNORED, IT IS REQUIRED
|__ package.json
|__ server.js
|__ etc.
```


### Content of .env file

This file is placed at project's root (same as `server.js`)

```bash
# Backend stuff
port = _____
host = _____
NODE_ENV = _____

#### DB_CONFIG ####
DB_USER     = _____
DB_PASSWORD = _____
DB_URL      = _____
DB_NAME     = _____
DB_TEST_NAME = _____

# Passport and JWT
PASSPORT_SECRET = _____

```


## Sources and references

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)


### Others

<https://www.toptal.com/software/trunk-based-development-git-flow>
<https://www.youtube.com/watch?v=2AIL1c-cJM0&ab_channel=TheFullStackJunkie>