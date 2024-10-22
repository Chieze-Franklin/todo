# #ToDo

![Screenshot 2024-10-22 at 08 50 33](https://github.com/user-attachments/assets/93a5c79a-819a-4ad4-9b1c-593ff63aa6cb)

## Getting Started

The project is set up as a monorepo, with both the backend and frontend existing in the same repo.
We achieve this by taking advantage of Yarn's built-in support for monorepos.

To get started run the following commands in the root directory:

- `yarn install` to install all dependencies

## Running the Application

### Without Docker

#### Database

To run the Postgresql database without Docker, use whatever method is convenient for you. For instance, you may choose to set up the database locally or remotely.

You can also decide to run only database using Docker by running the following command:

```bash
docker compose up postgres
```

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
VITE_AI_API_KEY=67172e91180c01de9d185cd5
VITE_AI_CHARACTER_ID=67172872180c01de9d185cce
```

**NOTE:** The above are the actual env values you should use for `VITE_AI_API_KEY` and `VITE_AI_CHARACTER_ID`.

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
VITE_AI_API_KEY=
VITE_AI_CHARACTER_ID=
```

For instance:

```bash
POSTGRES_USER=postgres_user
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=postgres_db
DATABASE_URL=postgresql://postgres_user:postgres_password@postgres:5432/postgres_db?schema=public
SECRET=whatever-you-want
VITE_SERVER_URL=http://127.0.0.1:3000
VITE_AI_API_KEY=67172e91180c01de9d185cd5
VITE_AI_CHARACTER_ID=67172872180c01de9d185cce
```

**NOTE:** The above are the actual env values you should use for `VITE_AI_API_KEY` and `VITE_AI_CHARACTER_ID`.

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

You can create a task by describing your task and pressing the `Enter` key.

Alternatively, you can hit the "sparkles" button to allow our AI create a task for you using your description.

### Group Tasks

You can organize your tasks into groups. By default, tasks are added to a `Default Group`.

![Screenshot 2024-10-22 at 10 31 34](https://github.com/user-attachments/assets/efe86b71-eb5f-4023-bbd2-c35211dd6ed1)

You can create new groups and select which group you want as the current group. Any new task created will be automatically added to that group.

You can expand a task and change its group.

![Screenshot 2024-10-22 at 10 33 14](https://github.com/user-attachments/assets/24e7e2fb-8f92-486b-9e06-85ce4bf73e8a)

### Add Task to Calendar

You can add a task to your calendar. There's support for Google, Yahoo, iCal and many other calendars.

If there was sufficient time, I would have implemented a feature where, using AI, the task is added to the _best_
open slot on the calendar.

### Toggle a Task

You can mark a task as done (or undone) simply by clicking on the task (or the "circle" next to it).

### Update a Task

You can update some properties of a task. For instance, you can change the group a task belongs to. You may need to "expand" a task to see it's full list of properties.

**NOTE:** Updating all properties of a task has not been implemented in this time due to insufficient time.

### Delete Tasks and Groups

You can delete a task.

You can also delete a group. This does **NOT** delete the tasks under that group butt moves the tasks to the default group.

### Offline-First

I couldn't find the time to implement a truly progressive web app using service workers so I implemented an offline-first app that stores tasks in the local storage of the Browser. This way, you can
continue adding new tasks even if there's no network connection to the backend. It's not a perfect implementation; it does not "sync" with the API when network connection is re-established.

## Testing

I couldn't get the tests to run and I did not want to spend more time than I had already spent on it but I did write some unit tests to show that I'm comfortable writing tests.

## Time Spent

I started working on this project in the evening of Sunday, October 20, 2024. I made my final submission in the morning of Tuesday, October 22, 2024.

I reckon the total _effective_ time (i.e. not including breaks) spent working on this app is approximately 12 hours, although there's really no way for me t be certain.

Some of the reasons for the time spent are:

- This is my first time using Tailwind CSS. I did not want to use a components library for this project so, I decided to use Tailwind CSS. I had to spend time learning how it works.
- This is my first time creating a React app with Vite. From time to time something would break and I had to go search the internet for help.
- This is my first time in a long time using basic Express Js. Over the past few years I have worked with GraphQL or some sort of more abstract framework than Express.
- I spent a very long time trying to get Jest to work. I did not succeed.

## Missing Functionalities

A number of desired features where not implemented due to insufficient time. These include:

- Updating all properties of a task
- Sorting/filtering tasks according to properties like priority, progress, etc.
