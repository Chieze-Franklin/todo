# #ToDo

![Screenshot 2024-10-21 at 05 03 05](https://github.com/user-attachments/assets/1caeee4c-051b-4a11-997e-df89d555e433)

## Getting Started

The project is set up as a monorepo, with both the backend and frontend existing in the same repo.
We achieve this by taking advantage of Yarn's built-in support for monorepos.

To get started run the following commands in the root directory:

- `yarn install` to install all dependencies

## Running the Application

### Without Docker

#### Database

To run the Postgresql database without Docker, use whatever method is convenient for you. For instance, you may choose to set up the database locally or remotely.

#### Server

To run the server, ensure you have the following environment variables set

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=
```

For instance:

```bash
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=postgres_db
DATABASE_URL=postgresql://postgres_user:postgres_password@localhost:5432/postgres_db?schema=public
SECRET=whatever-you-want
```

See _packages/backend/.env.example_

To run the backend server:

- Run `yarn dev` in the _packages/backend/_ directory **OR**
- Run `yarn dev:frontend` in the root directory

The backend server will be accessible at `localhost:3000`.

#### Client

To run the client, ensure you have the following environment variables set

```bash
VITE_SERVER_URL=
```

For instance:

```bash
VITE_SERVER_URL=http://127.0.0.1:3000
```

See _packages/frontend/.env.example_

To run the frontend client:

- Run `yarn dev` in the _packages/frontend/_ directory **OR**
- Run `yarn dev:frontend` in the root directory

The frontend server will be accessible at `localhost:5173`.

### With Docker

Ensure you have the following environment variables set in the _.env_ file in the root directory.

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=
VITE_SERVER_URL=
```

For instance:

```bash
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=postgres_db
DATABASE_URL=postgresql://postgres_user:postgres_password@postgres:5432/postgres_db?schema=public
SECRET=whatever-you-want
VITE_SERVER_URL=http://127.0.0.1:3000
```

Run `docker compose up -d` in the root directory.

The backend server will be accessible at `localhost:3000`.

The frontend client will be accessible at `localhost:5173`.

### Authentication

![Screenshot 2024-10-21 at 08 34 31](https://github.com/user-attachments/assets/d5cfc481-59c4-472b-85e6-ccd55e4e66af)

Due to insufficient time, the authentication implemented is very crude and insecure. For instance, password is not hashed and refresh token is not implemented.

To sign into the application, use any email and password. If no user exists with that email, a new user is created. If a user exists, their stored password is compared
to the provided password.

## Features

### Create Tasks

### Group Tasks

### Offline-First
