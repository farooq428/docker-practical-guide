# 🐳 Docker Compose - Complete Beginner to Advanced Guide (2026)

> A complete guide to Docker Compose, including syntax, commands, workflow, setup, and best practices.

---

# Table of Contents

- What is Docker Compose?
- Why Use Docker Compose?
- Dockerfile vs Docker Compose
- How Docker Compose Works
- Project Structure
- Docker Compose File
- Complete Syntax
- Every Docker Compose Property Explained
- Complete Example
- Complete Workflow
- Docker Compose Commands
- Best Practices

---

# What is Docker Compose?

Docker Compose is a tool that allows you to define and manage **multiple Docker containers** using a single YAML configuration file.

Instead of running multiple `docker run` commands, you write everything inside one file called:

```
compose.yml
```

or

```
docker-compose.yml
```

Then start the complete application using a single command.

```bash
docker compose up
```

Docker Compose automatically:

- Builds images (if needed)
- Creates containers
- Creates networks
- Creates volumes
- Connects containers
- Starts everything

---

# Why Use Docker Compose?

Suppose your MERN application contains:

- React Frontend
- Node.js Backend
- MongoDB
- Redis
- Nginx

Without Docker Compose, you would have to run many Docker commands manually.

Example:

```bash
docker run ...
docker run ...
docker run ...
docker run ...
docker run ...
```

With Docker Compose:

```bash
docker compose up
```

Everything starts automatically.

---

# Dockerfile vs Docker Compose

| Dockerfile | Docker Compose |
|------------|---------------|
| Creates an Image | Runs Multiple Containers |
| Used with `docker build` | Used with `docker compose up` |
| One Image | Complete Application |
| Defines image instructions | Defines container configuration |

Example

Dockerfile

```
Backend Image
```

Docker Compose

```
Backend
Frontend
MongoDB
Redis
Networks
Volumes
Environment Variables
```

---

# How Docker Compose Works

```
Project
│
├── backend/
│   └── Dockerfile
│
├── frontend/
│   └── Dockerfile
│
└── compose.yml
```

Workflow

```
Read compose.yml

↓

Build Images

↓

Create Containers

↓

Create Network

↓

Create Volumes

↓

Connect Containers

↓

Start Containers
```

---

# Project Structure

```
my-project/

│
├── backend/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── Dockerfile
│   └── package.json
│
├── .env
│
└── compose.yml
```

---

# Docker Compose File

Recommended filename

```
compose.yml
```

Older filename

```
docker-compose.yml
```

---

# Basic Syntax

```yaml
services:

  service-name:

    image:

    build:

    container_name:

    ports:

    environment:

    env_file:

    volumes:

    restart:

    depends_on:

    command:

    working_dir:

    stdin_open:

    tty:

    networks:
```

---

# Complete Docker Compose Syntax

```yaml
services:

  app:

    image: image-name

    build:
      context: .
      dockerfile: Dockerfile

    container_name: app-container

    ports:
      - "5000:5000"

    environment:
      PORT: 5000

    env_file:
      - .env

    volumes:
      - app-data:/app

    restart: unless-stopped

    depends_on:
      - mongodb

    command: npm start

    working_dir: /app

    stdin_open: true

    tty: true

    networks:
      - app-network

networks:

  app-network:

volumes:

  app-data:
```

---

# Docker Compose Properties

## 1. services

Every container is written inside `services`.

```yaml
services:

  backend:

  frontend:

  mongodb:
```

Each service becomes a Docker container.

---

# 2. image

Downloads an image from Docker Hub.

```yaml
image: mongo
```

Equivalent Docker command

```bash
docker pull mongo
docker run mongo
```

---

# 3. build

Builds an image from a Dockerfile.

```yaml
build: ./backend
```

Equivalent

```bash
docker build -t backend ./backend
```

Advanced

```yaml
build:

  context: ./backend

  dockerfile: Dockerfile
```

---

# 4. container_name

Assigns a custom name.

```yaml
container_name: backend-container
```

Instead of

```
happy_turing
```

You get

```
backend-container
```

---

# 5. ports

Maps host ports to container ports.

```yaml
ports:

  - "5000:5000"
```

Meaning

```
Host Port : Container Port

5000      :     5000
```

Multiple ports

```yaml
ports:

  - "3000:3000"

  - "5000:5000"
```

---

# 6. environment

Sets environment variables.

```yaml
environment:

  PORT: 5000

  NODE_ENV: production

  JWT_SECRET: abc123
```

Equivalent

```bash
docker run -e PORT=5000
```

---

# 7. env_file

Reads variables from a `.env` file.

```yaml
env_file:

  - .env
```

Example `.env`

```text
PORT=5000
JWT_SECRET=mysecret
MONGO_URI=mongodb://mongodb:27017/mydb
```

---

# 8. volumes

Used for persistent storage.

```yaml
volumes:

  - mongo-data:/data/db
```

Meaning

```
Docker Volume

↓

MongoDB Database
```

### Bind Mount

```yaml
volumes:

  - ./backend:/app
```

Meaning

```
Current Folder

↓

Container /app
```

---

# 9. restart

Automatically restarts containers.

```yaml
restart: always
```

Options

```
no

always

unless-stopped

on-failure
```

---

# 10. depends_on

Starts another service first.

```yaml
depends_on:

  - mongodb
```

Backend starts after MongoDB.

---

# 11. command

Overrides Dockerfile CMD. (if you dont need to overrite than skip it)

```yaml
command: npm start
```

---

# 12. working_dir

Sets working directory.

```yaml
working_dir: /app
```

Equivalent

```bash
cd /app
```

---

# 13. stdin_open

Keeps STDIN open.
STDIN stands for Standard Input.

It is the input channel through which a program receives data from the keyboard.
Normally, when a container starts, it runs its command. If the command doesn't need any user input, Docker closes the input stream.
By setting:

```yaml
stdin_open: true
```

Docker keeps the input stream open, allowing you to interact with the running container..

---

# 14. tty

Allocates a terminal.

```yaml
tty: true
```

Useful when using shells.

---

# 15. networks

Connects services to a custom network.

```yaml
networks:

  - app-network
```

Create network

```yaml
networks:

  app-network:
```

---

# Define Named Volumes

```yaml
volumes:

  mongo-data:
```

---

# Complete Example

```yaml
services:

  backend:

    build: ./backend

    container_name: backend-container

    ports:
      - "5000:5000"

    env_file:
      - .env

    depends_on:
      - mongodb

    restart: unless-stopped

  mongodb:

    image: mongo

    container_name: mongodb

    ports:
      - "27017:27017"

    volumes:
      - mongo-data:/data/db

volumes:

  mongo-data:
```

---

# Complete Workflow

## Step 1

Create project

```
my-project/

├── backend/

├── Dockerfile

└── compose.yml
```

---

## Step 2

Create Dockerfile

Example

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]
```

---

## Step 3

Create compose.yml

Write all services.

---

## Step 4

Build Images

```bash
docker compose build
```

Builds every image.

---

## Step 5

Run Containers

```bash
docker compose up
```

Starts all containers.

Detached Mode

```bash
docker compose up -d
```

Runs in the background.

---

## Step 6

Check Running Containers

```bash
docker compose ps
```

---

## Step 7

View Logs

All services

```bash
docker compose logs
```

Specific service

```bash
docker compose logs backend
```

Live logs

```bash
docker compose logs -f
```

---

## Step 8

Open Container Terminal

Using sh

```bash
docker compose exec backend sh
```

Using bash

```bash
docker compose exec backend bash
```

---

## Step 9

Restart Containers

```bash
docker compose restart
```

Restart only backend

```bash
docker compose restart backend
```

---

## Step 10

Stop Containers

```bash
docker compose stop
```

Containers remain on the system.

---

## Step 11

Start Stopped Containers

```bash
docker compose start
```

---

## Step 12

Stop and Remove Containers

```bash
docker compose down
```

Removes

- Containers
- Networks

Keeps

- Images
- Named Volumes

---

## Step 13

Remove Containers and Volumes

```bash
docker compose down -v
```

Deletes named volumes.

---

## Step 14

Rebuild Images

```bash
docker compose up --build
```

Useful after modifying the Dockerfile or source code.

---

## Step 15

Pull Latest Images

```bash
docker compose pull
```

Downloads newer versions from Docker Hub.

---

## Step 16

List Images

```bash
docker compose images
```

Shows images used by the project.

---

## Step 17

View Resource Usage

```bash
docker stats
```

Displays CPU, Memory, Network, and Disk I/O usage for running containers.

---

# Docker Compose Commands

| Command | Description |
|----------|-------------|
| `docker compose up` | Start all services |
| `docker compose up -d` | Start services in detached mode |
| `docker compose build` | Build images |
| `docker compose ps` | Show running containers |
| `docker compose logs` | Show logs |
| `docker compose logs -f` | Follow logs in real time |
| `docker compose exec SERVICE sh` | Open shell inside container |
| `docker compose restart` | Restart services |
| `docker compose stop` | Stop services |
| `docker compose start` | Start stopped services |
| `docker compose down` | Stop and remove containers |
| `docker compose down -v` | Remove containers and volumes |
| `docker compose pull` | Pull latest images |
| `docker compose images` | List project images |
| `docker compose config` | Validate Compose file |
| `docker compose version` | Show Docker Compose version |

---

# Best Practices

- Keep secrets inside a `.env` file.
- Use meaningful service names.
- Use named volumes for databases.
- Use bind mounts during development.
- Use `depends_on` to define startup order.
- Use `restart: unless-stopped` for long-running applications.
- Commit `compose.yml` to Git.
- Never commit `.env` files containing secrets.
- Keep one `compose.yml` file per project.

---

# Summary

Docker Compose simplifies managing multi-container applications by allowing you to define everything in one YAML file.

With Docker Compose, you can:

- Build images
- Create containers
- Connect services
- Manage networks
- Persist data with volumes
- Configure environment variables
- Start the complete application with one command

For MERN Stack applications, Docker Compose is the standard way to run the frontend, backend, MongoDB, Redis, and other supporting services together in a consistent and repeatable environment.


---

# Practical Example - React Frontend + Express Backend

Let's suppose we have the following project structure.

```
mern-app/

│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
└── compose.yml
```

---

# Frontend Dockerfile (React + Vite)

Location

```
frontend/Dockerfile
```

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
```

### Explanation

- Uses the official Node.js image.
- Creates the `/app` working directory.
- Installs dependencies.
- Copies the React project.
- Exposes port **5173** (default Vite port).
- Starts the React development server.

---

# Backend Dockerfile (Express)

Location

```
backend/Dockerfile
```

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]
```

### Explanation

- Uses Node.js.
- Copies the Express application.
- Installs dependencies.
- Opens port **5000**.
- Starts the Express server.

---

# Docker Compose File

Location

```
compose.yml
```

```yaml
services:

  frontend:

    build: ./frontend

    container_name: react-frontend

    ports:
      - "5173:5173"

    volumes:
      - ./frontend:/app
      - /app/node_modules

    depends_on:
      - backend

  backend:

    build: ./backend

    container_name: express-backend

    ports:
      - "5000:5000"

    volumes:
      - ./backend:/app
      - /app/node_modules

    environment:
      PORT: 5000

    restart: unless-stopped
```

---

# Understanding the Compose File

## Frontend Service

```yaml
frontend:
```

Creates the React container.

---

```yaml
build: ./frontend
```

Builds the image using

```
frontend/Dockerfile
```

---

```yaml
ports:

  - "5173:5173"
```

Maps

```
Your Browser

↓

localhost:5173

↓

React Container
```

---

```yaml
volumes:

  - ./frontend:/app
```

Syncs your local React project with the container.

Whenever you edit your React files, the changes are immediately available inside the container.

---

```yaml
- /app/node_modules
```

Prevents the local `node_modules` directory from replacing the container's installed dependencies.

---

```yaml
depends_on:

  - backend
```

Starts the backend container before the frontend container.

---

# Backend Service

```yaml
backend:
```

Creates the Express container.

---

```yaml
build: ./backend
```

Uses

```
backend/Dockerfile
```

to build the backend image.

---

```yaml
ports:

  - "5000:5000"
```

Maps

```
localhost:5000

↓

Express Container
```

---

```yaml
environment:

  PORT: 5000
```

Sets environment variables inside the container.

---

```yaml
restart: unless-stopped
```

Automatically restarts the backend if it crashes.

---

# Build the Images

```bash
docker compose build
```

Docker builds

- React Image
- Express Image

---

# Start the Application

```bash
docker compose up
```

or

```bash
docker compose up -d
```

Docker starts

- React Container
- Express Container

---

# Verify Running Containers

```bash
docker compose ps
```

Example

```
NAME                STATUS          PORTS

react-frontend      running         0.0.0.0:5173->5173

express-backend     running         0.0.0.0:5000->5000
```

---

# Open the Application

React Frontend

```
http://localhost:5173
```

Express Backend

```
http://localhost:5000
```

Example API

```
http://localhost:5000/api/users
```

---

# View Logs

All containers

```bash
docker compose logs
```

Frontend only

```bash
docker compose logs frontend
```

Backend only

```bash
docker compose logs backend
```

Live logs

```bash
docker compose logs -f
```

---

# Enter a Running Container

Frontend

```bash
docker compose exec frontend sh
```

Backend

```bash
docker compose exec backend sh
```

If Bash is available

```bash
docker compose exec backend bash
```

---

# Stop Containers

```bash
docker compose stop
```

---

# Remove Containers

```bash
docker compose down
```

---

# Rebuild After Code Changes

If you modify the Dockerfile or dependencies

```bash
docker compose up --build
```

Docker rebuilds the images and starts fresh containers.

---

# Complete Workflow

```
Write Dockerfiles

↓

Write compose.yml

↓

docker compose build

↓

docker compose up -d

↓

Open Browser

↓

React → http://localhost:5173

↓

Express → http://localhost:5000

↓

Develop Your Application

↓

docker compose logs

↓

docker compose down
```

---

# Communication Between Frontend and Backend

Since both services are on the same Docker Compose network, the frontend can reach the backend using the **service name** instead of `localhost`.

For example, inside the frontend container:

```text
http://backend:5000
```

Instead of:

```text
http://localhost:5000
```

This works because Docker Compose automatically creates a shared network and provides built-in DNS resolution for service names.