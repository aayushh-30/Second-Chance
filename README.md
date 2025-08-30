
# SecondChance

SecondChance is a backend service for a marketplace application, allowing users to buy and sell items. It includes functionalities for user authentication, item management, and commenting on items.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Item Routes](#item-routes)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [License](#license)

## Features

- User registration and login with JWT-based authentication.
- User profile management, including password and address updates.
- Account deactivation.
- Create, read, update, and delete items.
- Users can view all their listed items.
- Commenting system for items.

## API Endpoints

All endpoints are prefixed with `sc/api/v1`.

### User Routes

- `POST /users/signup`: Register a new user.
- `POST /users/login`: Log in a user.
- `POST /users/logout`: Log out a user.
- `PUT /users/changePassword`: Update the user's password (requires authentication).
- `PUT /users/changeAddress`: Update the user's address (requires authentication).
- `DELETE /users/deactivateAccount`: Deactivate the user's account (requires authentication).

### Item Routes

- `POST /items/addItem`: Add a new item (requires authentication).
- `POST /items/addComment`: Add a comment to an item (requires authentication).
- `PUT /items/updateItem`: Update an existing item (requires authentication).
- `PUT /items/updateComment`: Update a comment (requires authentication).
- `GET /items/getAll`: Get a list of all items.
- `GET /items/getItem/:id`: Get a specific item by its ID.
- `GET /items/getItemOfAUser`: Get all items listed by the authenticated user (requires authentication).
- `DELETE /items/delete/:item_id`: Delete an item by its ID (requires authentication).
- `DELETE /items/deleteComment`: Delete a comment (requires authentication).

### Health Check

- `GET /health/health`: Check the health of the server.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For securing API endpoints.
- **bcryptjs**: For password hashing.
- **Winston**: For logging.
- **Nodemon**: For automatic server restarts during development.
- **Dotenv**: For managing environment variables.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd SecondChance
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    PORT=3000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

## Usage

To run the server in development mode with automatic restarts, use:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## License

This project is licensed under the ISC License.
# Second-Chance
