# PASSWORD MANAGER (In Progress)

Password Manager web app using MERN stack(MongoDB, Express, Nuxt, Node)

## App feature

- App help user organize password and username for specify website
- User can use built-in auto gen function to generate high security password

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the backend server using the `npm run start` command.
- Run the client server using the `npm start` command.

## App work flow

User login their own account with username and password. Server will hash the password and find any match user in database. If success, server response set session with userID and userIV by using JWT(json web token), and list of user's website's username and password obj to client side. Client list out the website name with dropdown menu and allow user browser individual website username and password(hidden) by click. User will able to see the password and copy to clipboard for future use.
When user create new username and password set. Server receive the data from client side and encrypt the data and send to mongoDB. Retrieve will same process with reverse step.

## What I learn from this APP

In this project build. I will learn to use node built encrypt and decrypt function to encrypt the data, and Hash username and password to store in the database.

## Dependency

- Vue3
- NodeJS
- Express
- Axios
- Mongoose
- crypto
- Bcrypt
- JWT (Jason Web Token)
