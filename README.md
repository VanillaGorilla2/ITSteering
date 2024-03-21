# ITSteering

Exercise for job application. Project I was assigned to determine my knowledge level in programming languages React, Express and MongoDB.

## Basic installations

- install Node.js and npm:
  - https://nodejs.org/en/download
- install mongoDB:
  - https://www.mongodb.com/try/download/community,
  - navigate to C:\ (root)
    - create new directory called "data" (mkdir data),
    - navigate to "data" (cd data),
    - create new directory "db" (mkdir db)

## Getting started

    1. Clone the project, then navigate to .\ITSteering (cd .\ITSteering)
    2. Run the following commands:
        - npm install (it installs all the dependencies provided in package.json),
        - npm test (it creates the database and fills with test examples),
        - npm start (starts the API server, which connects to the database),
    3. Open new terminal
    4. Navigate to .\ITSteering again (cd .\ITSteering),
    5. Run the following command:
        - npm install (install vite, and all the React project dependencies),
        - npm run dev (runs the React project)

## Features

- has 2 different priviledges: admin and user,
- admin priviledge has 3 functionalities:

  1. allows to delete chosen project from the list and the database,
  2. allows to edit chosen project at will,
  3. can scroll through all the projects.

- user priviledge has 2 functionalities:

  1. can create a new project,
  2. can scroll through all the projects.

## Additional info

- credentials for "admin" and "user" will be provided in email
