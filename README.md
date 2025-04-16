# test-task

## Description for task

Requirements
1. NestJS application setup

Create a new NestJS project using the Nest CLI. +


2. MongoDB Connection

Set up a free cluster on MongoDB Atlas with mock data.
Connect the NestJS app to this MongoDB instance using Mongoose.

3. Authentication

Create a registration route (/auth/register) that accepts a simple login and password.
Create a login route (/auth/login) that authenticates users and returns a JWT token.
Use bcrypt to hash passwords.

4. JWT Authorization

Use JWT for securing routes.
Create a route (/auth/validate) that checks if the provided JWT token is valid and   returns user info.

5. Protected Route with Pagination

Create a route (GET /items) that:
Returns a paginated list of documents from a mock collection in MongoDB.
Is accessible only to authenticated users (JWT-protected).
Uses a popular npm pagination package (e.g. mongoose-paginate-v2).
Returns documents that include a populated ObjectId reference field (use populate()).

Postman Collection
Provide a Postman collection with sample requests for:
Registration
Login
JWT validation

Getting items (with token)

README.md Instructions

Your README.md file should include:
How to run the application locally


How to use the JWT in protected routes (e.g. in headers)


Example .env file with MongoDB Atlas connection string


Technologies to Use:
NestJS
MongoDB Atlas
Mongoose
bcrypt
JWT (@nestjs/jwt)
Any pagination library (e.g., mongoose-paginate-v2)



## Requirements
[Node.js >= 22.x](https://nodejs.org/en/download/)

1. API

## Pre-installation None

## Installation

1. Run `npm i`
2. Copy [`.dev.env`, `.stage.env`, `.prod.env`] files to root of projects
3. Install mongoDB to your PC. https://www.mongodb.com/docs/manual/installation/ or use https://www.mongodb.com/cloud/atlas/register

## API

You have to use Authorization: Bearer token, for use some routes

