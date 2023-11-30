# Node.js MongoDB Messaging Backend

## Introduction
This is a messaging backend built using Node.js and MongoDB. It includes routes for users, messages, and a help endpoint that returns nested JSON data.

## Features
- **CORS and JSON Parsing**: Integrated middleware for CORS and JSON parsing.
- **Environment Variables**: Uses dotenv for environment variable management.
- **User and Message Routes**: Dedicated routes for handling user and message data.
- **Nested JSON Response**: Custom JSON structure returned on the `/help` route.
- **Dynamic Port Configuration**: Configurable server port through environment variables.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Nag112/messengerBackend.git
  ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
- Create a .env file in the project root.
- Define the PORT variable (optional, default is 5001):
   ```bash
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/messenger
    ```

## Running the Server
Start the server with the following command:
    ```bash
    npm server.js
    ```

## API Endpoints
- GET / - Returns a simple greeting message.
- GET /help - Returns nested JSON data.
- USE /user - User-related operations.
- USE /messages - Message-related operations.

## Contributing
Feel free to contribute to this project. Please open an issue or submit a pull request with your proposed changes or improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.