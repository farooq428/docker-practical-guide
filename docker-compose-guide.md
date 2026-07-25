# Dockerfile vs Docker Compose

One of the most common Docker interview questions is:

> **What is the difference between Dockerfile and Docker Compose?**

Although both are used in Docker, they serve completely different purposes.

---

# Quick Comparison

| Dockerfile | Docker Compose |
|------------|----------------|
| Used to **build an image** | Used to **run and manage multiple containers** |
| Contains instructions to create an image | Contains configuration for one or more services/containers |
| Creates **one image** | Starts **one or many containers** |
| Usually named `Dockerfile` | Usually named `compose.yaml` (or `docker-compose.yml`) |
| Used with `docker build` | Used with `docker compose up` |

---

# What is a Dockerfile?

A **Dockerfile** is a text file that contains instructions for building a Docker image.

Think of it as a **recipe**.

It tells Docker:

- Which base image to use
- Which files to copy
- Which dependencies to install
- Which command to run when the container starts

## Example

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

Build the image using:

```bash
docker build -t my-app .
```

This command creates a Docker image named **my-app**.

---

# What is Docker Compose?

Docker Compose is a tool used to define and run **multiple containers** using a single configuration file.

Think of it as a **manager**.

Instead of running many `docker run` commands, you define all services in one `compose.yaml` file.

## Example

```yaml
services:
  backend:
    build: .
    ports:
      - "5000:5000"

  mongodb:
    image: mongo
    ports:
      - "27017:27017"
```

Run all services using:

```bash
docker compose up
```

Docker Compose will:

- Build the backend image
- Pull the MongoDB image
- Create both containers
- Connect them on the same network

---

# How Dockerfile and Docker Compose Work Together

```text
Dockerfile
     │
     ▼
Build Image
     │
docker build
     │
     ▼
Docker Image
     │
     ▼
Docker Compose
     │
docker compose up
     │
     ▼
Containers Running
```

The **Dockerfile builds an image**, while **Docker Compose starts containers** using that image.

---

# Real MERN Stack Example

Project structure:

```text
project/
│
├── frontend/
│   ├── Dockerfile
│   └── ...
│
├── backend/
│   ├── Dockerfile
│   └── ...
│
└── compose.yaml
```

---

## Backend Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
```

---

## Frontend Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

---

## compose.yaml

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  backend:
    build: ./backend
    ports:
      - "5000:5000"

  mongodb:
    image: mongo
    ports:
      - "27017:27017"
```

Run everything:

```bash
docker compose up
```

Docker Compose will automatically:

1. Build the frontend image.
2. Build the backend image.
3. Pull the MongoDB image.
4. Create all containers.
5. Connect the containers through a shared network.

---

# Simple Analogy

Imagine you're opening a restaurant.

## Dockerfile = Recipe

A recipe tells the chef:

- Which ingredients to use
- How to cook the food
- What the final dish should look like

The final dish is the **Docker Image**.

---

## Docker Compose = Restaurant Manager

The restaurant manager:

- Opens the restaurant
- Starts the kitchen
- Assigns chefs
- Coordinates all staff
- Ensures everything works together

The manager doesn't cook the food—it manages the entire restaurant.

---

# Visual Comparison

```text
Dockerfile
──────────

Recipe
   │
   ▼
Build Image
   │
docker build
   │
   ▼
Docker Image

────────────────────────────────────────────

Docker Compose

compose.yaml
      │
      ▼
docker compose up
      │
      ▼
Creates Multiple Containers

Frontend
Backend
MongoDB
Redis (Optional)
```

---

# When Should You Use Each?

Use a **Dockerfile** when you want to:

- Build a custom Docker image
- Install dependencies
- Configure your application
- Package your application into an image

Use **Docker Compose** when you want to:

- Run multiple containers
- Connect services together
- Manage environment variables
- Create volumes
- Configure networks
- Start or stop all services with one command

---

# Common Commands

## Dockerfile

Build an image:

```bash
docker build -t my-app .
```

Run a container:

```bash
docker run -p 5000:5000 my-app
```

---

## Docker Compose

Start all services:

```bash
docker compose up
```

Start in detached mode:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs
```

---

# Summary

| Feature | Dockerfile | Docker Compose |
|----------|------------|----------------|
| Purpose | Build an image | Run and manage containers |
| File Name | `Dockerfile` | `compose.yaml` |
| Main Command | `docker build` | `docker compose up` |
| Output | Docker Image | Running Containers |
| Used For | Packaging an application | Managing multiple services |

---

# Key Takeaways

- A **Dockerfile** defines **how to build a Docker image**.
- **Docker Compose** defines **how to run and manage one or more containers**.
- Docker Compose can automatically build images using Dockerfiles.
- Most real-world applications (such as MERN Stack projects) use **both Dockerfile and Docker Compose together**.

> **Remember:**
>
> - **Dockerfile = Builds Images**
> - **Docker Compose = Runs Containers**
> - **Dockerfile + Docker Compose = Complete Docker Application**