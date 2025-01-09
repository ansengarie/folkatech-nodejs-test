# Folkatech Backend Microservices

This project is a backend microservices API built with Node.js, MongoDB, Redis, and Docker. It handles CRUD operations for user data, implements token-based authentication, and caching for vehicle data.

## Features

- *CRUD Operations for User Data*: Allows creating, reading, updating, and deleting user data (ID, username, account number, email address, and identity number).
- *Authentication*: Protects API routes with authorization using JWT (JSON Web Tokens).
- *Redis Caching*: Implements a caching strategy using Redis for vehicle data to improve performance. Changes in the MongoDB database are synced to Redis.
- *Dockerized*: The app is fully containerized using Docker and Docker Compose for easy deployment and management.
- *Environment Configuration*: Configurable environment variables for local and Dockerized environments.

## Technologies Used

- *Node.js*: Backend framework for building the API.
- *MongoDB*: NoSQL database for storing user data.
- *Redis*: In-memory data store for caching vehicle data.
- *JWT*: For authentication and securing API endpoints.
- *Docker*: For containerization and deployment.
- *Postman*: For API testing.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- *Node.js* (v18 or higher)
- *MongoDB* (running locally or via Docker)
- *Redis* (running locally or via Docker)
- *Docker* (optional for running the application in containers)

## Setup

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/folkatech-nodejs-backend.git
cd folkatech-nodejs-backend
```

### 2. Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following configuration for local development:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/db_aji
REDIS_HOST=127.0.0.1
JWT_SECRET=your_jwt_secret
```

For Docker, create a .env.docker file:

```bash
MONGO_URI=mongodb://mongo:27017/db_aji
REDIS_HOST=redis
JWT_SECRET=your_jwt_secret
```

### 4. Running the Application Locally
You can run the application locally using:

```bash
npm start
```
The app will start and be available at http://localhost:3000.

### 5. Running the Application with Docker
To run the app using Docker, use the following command:

```bash
docker-compose up --build
```
The app will start within Docker containers. The backend API will be accessible at http://localhost:3001 (as defined in docker-compose.yml).

6. Running Tests (Optional)
You can run tests using the following command:

```bash
npm test
```

## Endpoints
### 1. POST /auth/add-admin
Create a new admin.

Request Body:

```json
{
  "adminName": "Aji Nuansa",
  "emailAddress": "aji@gmail.com",
  "password": "admin_password"
}
```
Response:

```json
{
  "adminName": "Aji Nuansa",
  "emailAddress": "aji@gmail.com",
  "password": "$2a$10$...hashed_password",
  "_id": "admin_id",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "__v": 0
}
```

### 2. POST /auth/generate-token
Generate JWT token for an admin.

Request Body:

```json
{
  "emailAddress": "aji@gmail.com",
  "password": "admin_password"
}
```


Response:

```json
{
  "token": "your_jwt_token"
}
```


## Docker Compose Configuration
This project uses Docker Compose to manage containers for the backend application, MongoDB, and Redis.

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - MONGO_URI=${MONGO_URI}
      - REDIS_HOST=${REDIS_HOST}
    depends_on:
      - mongo
      - redis
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
```