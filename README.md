## Loom Video

https://www.loom.com/share/a5f14638312340118a0a6b62eb5a9ec5

## Overview

This is a simple project in which I used authentication and nodeMailer to send an email to the user when they sign up. I also used the bcrypt package to hash the password and store it in the database. I used the connect-mongo package to store the session in the database. I used the express-validator package to validate the user's input. I used the dotenv package to store the environment variables. I used the mongoose package to connect to the database. I used the express package to create the server. I used the nodemon package to restart the server when I make changes to the code.

## Installation

- Clone the repository
- Go to frontend folder and run `npm install`
- Go to backend folder and run `npm install`

## env file

Please add the .env file in backend with following data:

PORT = 5000
DB_CONNECT = "mongodb://localhost:27017/test_auto_shop" // OR "the collection of your choice"
TOKEN_SECRET = "asad123"

## Usage

- Go to backend folder and run `npm run dev`
- Go to frontend folder and run `npm start`

## Technologies Used In This Project

- React
- Node.js
- Express
- Mongoose
- Bcrypt
- Express-Validator
- Dotenv
- Nodemon
- NodeMailer
- Material-UI
- React-Router-Dom
- Redux-Toolkit-Query
- React-Redux
- Formik
- Yup
- Axios

## Api's for testing in Postman

- POST http://localhost:5000/api/auth/signUp - To sign up
- POST http://localhost:5000/api/auth/login - To sign in
- POST http://localhost:5000/api/auth/logout - To sign out
- GET http://localhost:5000/api/category - To get all categories
- POST http://localhost:5000/api/category/create - To create a category
- PUT http://localhost:5000/api/category/update/:id - To update a category
- DELETE http://localhost:5000/api/category/delete/:id - To delete a category
- GET http://localhost:5000/api/vehicle - To get all vehicles
- POST http://localhost:5000/api/vehicle/create - To create a vehicle
- PUT http://localhost:5000/api/vehicle/update/:id - To update a vehicle
- DELETE http://localhost:5000/api/vehicle/delete/:id - To delete a vehicle
