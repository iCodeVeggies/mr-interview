# MobileReality User Management API

This API provides basic CRUD operations for managing users, leveraging NestJS, PostgreSQL, and Redis.

## Features

- User creation, retrieval, update, and deletion.
- Support for listening to `CREATE_USER` messages on Redis.
- PostgreSQL as primary database.
- Docker and Docker Compose for easy setup and development.

## Prerequisites

- Docker
- Docker Compose

## Setup & Running

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

Next, build and run the Docker containers:

```bash
docker-compose up --build
```

The API should now be running at `http://localhost:3000`.

## API Endpoints

### `POST /users`

Create a new user.

### `GET /users`

Retrieve all users.

### `GET /users/:userId`

Retrieve a specific user by ID.

### `PATCH /users/:userId`

Update a specific user by ID.

### `DELETE /users/:userId`

Delete a specific user by ID.

## Testing

You can test the API endpoints using any HTTP client (such as curl or Postman).

To simulate a `CREATE_USER` message on Redis, use the following command:

```bash
docker exec -it redis redis-cli publish CREATE_USER '{"email":"redis@example.com","firstName":"Redis","lastName":"User"}'
```

Remember to replace `redis` with the actual name of your Redis Docker container if it's different.

## Further Improvements

The project could be extended to include:

- More comprehensive error handling and validation
- Logging and monitoring
- User authentication and authorization
- Data persistence and backup strategies for PostgreSQL and Redis
- More comprehensive tests (unit, integration, end-to-end)
- CI/CD integration

## License

This project is licensed under the MIT License.