# To Do Demo Application

## Environment Setup

You have three different ways to set up and access the api server for this demo.

### 1. Connecting to the deployed version

Link: https://lfx-interview-backend-fjy5bjnqka-df.a.run.app/api

### 2. Running in local environment

**Prerequisite**

- **node** installed
- **postgresql** installed

**Steps**

1. install the necessary dependencies

```
yarn install
```

2. create .env at root

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<db_name>?schema=public
JWT_SECRET=HiLfx
PORT=8080
SALT_ROUND=10
```

3. Migrate the existing schema in postgres

```
yarn prisma migrate dev
```

4. After installing the necessary packages and set up in database

```bash
yarn start:dev
```

4. Done
   Browse http://localhost:8080/api

### 3. Running in docker environment

**Prerequisite**

- **docker** installed

**Steps**

1. building the image according to dockerfile

```
docker build -t <image_name> .
```

2. run the image with the env set up same as above

```
docker run -it --env-file=.env <image_id>
```

## Server API

| METHOD | ROUTE           | Auth Strategy |
| ------ | --------------- | ------------- |
| POST   | /auth/login     | Local         |
| POST   | /user           | No            |
| GET    | /user/:username | No            |
| DELETE | /user           | JWT           |
| PATCH  | /user/:id       | JWT           |
| POST   | /todos          | JWT           |
| GET    | /todos/:id      | JWT           |
| DELETE | /todos          | JWT           |
| PATCH  | /todos/:id      | JWT           |
