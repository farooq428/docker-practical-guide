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

Overrides Dockerfile CMD.

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

```yaml
stdin_open: true
```

Useful for interactive containers.

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