# SQUIRTLE

Squirtle is a rideshare application designed specifically for UCLA students. Our goal is to enhance the university transportation experience, with a vision to expand to all universities. We aim to transform campus commutes, making them more efficient and affordable.

Our application is a way for students to find and create rides, and coordinate with students going on the same trips as them.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Backend Setup](#backend-setup)
- [Authors](#authors)

## Features

- **Search/Filter Trips:** Easily search for and filter trips based on various criteria.
- **Create Trips:** Users can create new trips by specifying the destination, pickup date, and time.
- **Join Trips:** Join existing trips that match your schedule and destination.
- **Personalized Dashboard:** View all your trips in a personalized dashboard for easy management.

## Tech Stack

- **JavaScript** <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript" width="30px">
- **Node.js** <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node.js" width="30px">
- **React.js** <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="react.js" width="30px">
- **Express.js** <img src="https://inapp.com/wp-content/uploads/elementor/thumbs/express-js-01-1-q05uw85vt1jqloiy5k82sfy7tgvysgt1uqld8slsbc.png" alt="Express.js" height="30px">
- **MongoDB** <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/razorback4417/squirtle.git
    ```

2. Navigate into the main project folder
    ```bash
    cd squirtle
    ```

3. Install the project dependencies
    ```bash
    npm install
    ```

4. Navigate into the `squirtleride` folder and start the development server
    ```bash
    cd squirtleride
    npm run dev
    ```

### Backend Setup

To setup the dependencies for the backend server, run:
```bash
cd backend
npm install
```
This will download a set of `node_modules` for the backend server.

**Secrets**
Create a `.env` file in the `backend` folder with the following contents:
```plaintext
PORT=4000
MONGO_URI=[insert key]
JWT_SECRET=[insert key]
```
* **MONGO_URI:** Obtain this from your MongoDB Atlas account or local MongoDB instance.

* **JWT_SECRET:** Generate a secure key using the following command:
```bash
openssl rand -base64 64
```

**Running**
To start the backend server, run:
```bash
cd backend
npm run dev
```

Now, both the frontend and backend servers are running. You can access the application at `http://localhost:3000` (or whatever port your environment is set to).

## Authors
Squirtle was made as a project for CS 35L taught by Professor Paul Eggert at UCLA in Spring 2024. Made by: Alex Zheng, Kevin Sun, Nathan Zhang, and Theo Luu.
