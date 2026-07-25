# Dockerfile Instructions Explained

This guide explains the most commonly used Dockerfile instructions with examples and simple analogies.

---

# 1. FROM

## What is it?

`FROM` specifies the **base image** on which your Docker image will be built.

Think of it as the **foundation of a house**.

Without `FROM`, Docker doesn't know where to start.

## Syntax

```dockerfile
FROM image_name:tag
```

## Example

```dockerfile
FROM node:22
```

This tells Docker:

> "Start with the official Node.js version 22 image."

You can also use:

```dockerfile
FROM ubuntu:24.04
```

or

```dockerfile
FROM python:3.12
```

## Real-Life Analogy

Imagine you're making tea.

Before making tea, you need a **cup**.

The cup is your **base image**.

Everything else is added later.

---

# 2. WORKDIR

## What is it?

`WORKDIR` sets the **working directory** inside the container.

Every command after this will run inside that directory.

## Syntax

```dockerfile
WORKDIR /directory
```

## Example

```dockerfile
WORKDIR /app
```

Docker creates `/app` if it doesn't already exist.

Now every command runs inside `/app`.

### Without `WORKDIR`

```dockerfile
COPY . .
RUN npm install
```

Docker doesn't know where to copy files.

### With `WORKDIR`

```dockerfile
WORKDIR /app
COPY . .
RUN npm install
```

Everything happens inside `/app`.

## Real-Life Analogy

Imagine opening a folder on your computer.

```
D:\Projects\MyApp
```

Now every file you create goes into that folder.

`WORKDIR` works the same way inside a Docker container.

---

# 3. COPY

## What is it?

`COPY` copies files from your computer into the Docker image.

## Syntax

```dockerfile
COPY source destination
```

## Example

```dockerfile
COPY . .
```

This means:

- Copy everything from the current folder
- Paste it into the current working directory inside the container

### Example Project

```
project/
│── server.js
│── package.json
│── Dockerfile
```

Dockerfile:

```dockerfile
WORKDIR /app
COPY . .
```

After copying:

```
Container
└── /app
    ├── server.js
    ├── package.json
    └── Dockerfile
```

### Copy Only `package.json`

```dockerfile
COPY package.json .
```

### Copy a Folder

```dockerfile
COPY images ./images
```

---

# 4. ADD

## What is it?

`ADD` is similar to `COPY`, but it has extra features.

It can:

- Copy files
- Automatically extract compressed archives
- Download files from a URL (generally discouraged in favor of `COPY`)

## Example

```dockerfile
ADD project.tar.gz /app
```

Docker automatically extracts the archive.

Most developers prefer using:

```dockerfile
COPY
```

because it is simpler and more predictable.

---

# 5. RUN

## What is it?

`RUN` executes commands while the Docker image is being built.

## Example

```dockerfile
RUN npm install
```

Docker installs all project dependencies.

Another example:

```dockerfile
RUN apt-get update
```

Or:

```dockerfile
RUN apt-get install -y git
```

## Real-Life Analogy

Think of installing software on a laptop before giving it to someone.

Once the image is built, these commands have already been completed.

---

# 6. CMD

## What is it?

`CMD` specifies the default command that runs when the container starts.

## Example

```dockerfile
CMD ["node","server.js"]
```

When someone runs:

```bash
docker run myapp
```

Docker automatically executes:

```bash
node server.js
```

## Difference Between `RUN` and `CMD`

### RUN

Runs while the image is being built.

### CMD

Runs when the container starts.

### Example

```dockerfile
RUN npm install
CMD ["npm","start"]
```

---

# 7. ENV

## What is it?

`ENV` sets environment variables.

## Syntax

```dockerfile
ENV KEY=value
```

## Example

```dockerfile
ENV PORT=3000
```

Another example:

```dockerfile
ENV NODE_ENV=production
```

Inside Node.js:

```javascript
console.log(process.env.PORT);
```

Output:

```text
3000
```

### Multiple Environment Variables

```dockerfile
ENV PORT=3000
ENV DB_NAME=mydb
ENV JWT_SECRET=mysecret
```

---

# 8. EXPOSE

## What is it?

`EXPOSE` documents which port the application uses.

## Example

```dockerfile
EXPOSE 3000
```

This means:

> "My application listens on port 3000."

**Important:** `EXPOSE` does **not** make the port accessible outside the container.

You still need:

```bash
docker run -p 3000:3000 myapp
```

---

# 9. ENTRYPOINT

## What is it?

`ENTRYPOINT` defines the main executable that always runs when the container starts.

## Example

```dockerfile
ENTRYPOINT ["node"]
```

If you run:

```bash
docker run myapp server.js
```

Docker actually executes:

```bash
node server.js
```

## Difference Between `CMD` and `ENTRYPOINT`

### CMD

Can be completely overridden.

Example Dockerfile:

```dockerfile
CMD ["node","server.js"]
```

Run:

```bash
docker run myapp node test.js
```

Docker executes:

```bash
node test.js
```

### ENTRYPOINT

Usually stays fixed, while additional arguments are appended.

Dockerfile:

```dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
```

Run:

```bash
docker run myapp
```

Executes:

```bash
node server.js
```

Run:

```bash
docker run myapp app.js
```

Executes:

```bash
node app.js
```

---

# Complete Example Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["node","server.js"]
```

---

# What Happens Step by Step?

1. Docker downloads the Node.js 22 base image (`FROM`).
2. It creates and switches to the `/app` directory (`WORKDIR`).
3. It copies `package.json` and `package-lock.json` into `/app` (`COPY`).
4. It installs the project dependencies (`RUN npm install`).
5. It copies the rest of your application files (`COPY . .`).
6. It sets the `PORT` environment variable to `3000` (`ENV`).
7. It documents that the application listens on port `3000` (`EXPOSE`).
8. When the container starts, it runs `node server.js` (`CMD`).

---

# Summary Table

| Instruction | Runs During | Purpose |
|------------|------------|---------|
| `FROM` | Build | Select the base image |
| `WORKDIR` | Build | Set the working directory |
| `COPY` | Build | Copy files into the image |
| `ADD` | Build | Copy files, extract archives, or download from URLs |
| `RUN` | Build | Execute commands while creating the image |
| `ENV` | Build (available at runtime) | Set environment variables |
| `EXPOSE` | Build | Document the port used by the application |
| `CMD` | Container Start | Default command to run |
| `ENTRYPOINT` | Container Start | Main executable for the container |

---

# Conclusion

These are the most important Dockerfile instructions that every Docker developer should understand. Mastering them will help you build Docker images for Node.js, Express, MERN Stack, Python, Java, and many other applications.




# Running a Dockerfile

This guide explains how to build and run a Docker image from a `Dockerfile` step by step.

---

# Prerequisites

Before you begin, make sure you have:

- Docker Desktop installed (Windows/macOS) or Docker Engine (Linux)
- Docker is running
- A project containing a `Dockerfile`

Example project structure:

```text
my-project/
│── Dockerfile
│── package.json
│── package-lock.json
│── server.js
│── .dockerignore
```

---

# Step 1: Open the Terminal

Navigate to the folder containing your `Dockerfile`.

Example:

```bash
cd D:\WebProjects\docker-practical-guide
```

Verify that the `Dockerfile` exists:

```bash
dir
```

or on Linux/macOS:

```bash
ls
```

You should see:

```text
Dockerfile
package.json
server.js
...
```

---

# Step 2: Build the Docker Image

Use the following command:

```bash
docker build -t my-app .
```

## Explanation

| Part | Meaning |
|------|---------|
| `docker build` | Builds a Docker image |
| `-t` | Assigns a name (tag) to the image |
| `my-app` | Name of the image |
| `.` | Use the current directory as the build context |

---

## Example

```bash
docker build -t node-app .
```

Docker will:

1. Read the Dockerfile.
2. Download the base image (if needed).
3. Execute each Dockerfile instruction.
4. Create a new Docker image.

---

# Step 3: Verify the Image

List all images:

```bash
docker images
```

Example output:

```text
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
node-app      latest    8c7f34d1ab12   20 seconds ago  350MB
```

---

# Step 4: Run the Docker Container

Run the image using:

```bash
docker run -d -p 3000:3000 --name my-container node-app
```

## Explanation

| Part | Meaning |
|------|---------|
| `docker run` | Starts a new container |
| `-d` | Run in detached (background) mode |
| `-p 3000:3000` | Map host port 3000 to container port 3000 |
| `--name my-container` | Assign a name to the container |
| `node-app` | Docker image to run |

---

## What Happens?

Docker:

- Creates a container from the image.
- Starts the application.
- Maps port **3000** on your computer to **3000** inside the container.

Now visit:

```text
http://localhost:3000
```

---

# Step 5: View Running Containers

```bash
docker ps
```

Example:

```text
CONTAINER ID   IMAGE      STATUS       PORTS
8d17ca9f12d3   node-app   Up 10 sec    0.0.0.0:3000->3000/tcp
```

---

# Step 6: View All Containers

```bash
docker ps -a
```

This shows both running and stopped containers.

---

# Step 7: View Container Logs

```bash
docker logs my-container
```

Example:

```text
Server running on http://localhost:3000
Connected to database
```

To continuously watch logs:

```bash
docker logs -f my-container
```

---

# Step 8: Enter the Running Container

Open a shell inside the container:

```bash
docker exec -it my-container bash
```

If Bash is unavailable:

```bash
docker exec -it my-container sh
```

Now you can inspect files and run commands inside the container.

---

# Step 9: Stop the Container

```bash
docker stop my-container
```

---

# Step 10: Start the Container Again

```bash
docker start my-container
```

---

# Step 11: Restart the Container

```bash
docker restart my-container
```

---

# Step 12: Remove the Container

First stop it:

```bash
docker stop my-container
```

Then remove it:

```bash
docker rm my-container
```

---

# Step 13: Remove the Docker Image

```bash
docker rmi node-app
```

If the image is being used by a container, remove the container first.

---

# Rebuilding After Code Changes

If you change your application code or Dockerfile:

### Build a new image

```bash
docker build -t node-app .
```

### Remove the old container

```bash
docker rm -f my-container
```

### Run a new container

```bash
docker run -d -p 3000:3000 --name my-container node-app
```

---

# Running with Environment Variables

Example:

```bash
docker run -d \
-p 3000:3000 \
-e PORT=3000 \
-e NODE_ENV=production \
--name my-container \
node-app
```

On Windows PowerShell:

```powershell
docker run -d `
-p 3000:3000 `
-e PORT=3000 `
-e NODE_ENV=production `
--name my-container `
node-app
```

---

# Complete Workflow

```bash
# Build the image
docker build -t node-app .

# Verify the image
docker images

# Run the container
docker run -d -p 3000:3000 --name my-container node-app

# Check running containers
docker ps

# View logs
docker logs my-container

# Open a shell inside the container
docker exec -it my-container bash

# Stop the container
docker stop my-container

# Start it again
docker start my-container

# Remove the container
docker rm -f my-container

# Remove the image
docker rmi node-app
```

---

# Common Docker Commands

| Command | Description |
|----------|-------------|
| `docker build -t image-name .` | Build a Docker image |
| `docker images` | List Docker images |
| `docker run image-name` | Run a container |
| `docker run -d image-name` | Run in background |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker logs container-name` | View container logs |
| `docker exec -it container-name bash` | Open a shell inside a container |
| `docker stop container-name` | Stop a container |
| `docker start container-name` | Start a stopped container |
| `docker restart container-name` | Restart a container |
| `docker rm container-name` | Remove a container |
| `docker rmi image-name` | Remove an image |

---

# Troubleshooting

## Docker daemon is not running

Error:

```text
Cannot connect to the Docker daemon
```

Solution:

- Open Docker Desktop.
- Wait until Docker shows **Running**.
- Try the command again.

---

## Port Already in Use

Error:

```text
Bind for 0.0.0.0:3000 failed
```

Solution:

- Stop the process using port **3000**.
- Or use another port:

```bash
docker run -d -p 5000:3000 node-app
```

---

## Image Not Found

Error:

```text
Unable to find image
```

Solution:

- Build the image first:

```bash
docker build -t node-app .
```

---

## Container Exits Immediately

Possible reasons:

- The application crashed.
- The startup command is incorrect.
- Required environment variables are missing.

Check logs:

```bash
docker logs my-container
```

---

# Summary

The basic Docker workflow is:

1. Create a `Dockerfile`.
2. Build a Docker image using `docker build`.
3. Run a container using `docker run`.
4. Verify it with `docker ps`.
5. View logs using `docker logs`.
6. Stop or restart the container when needed.
7. Remove containers and images when they are no longer required.

Following these steps allows you to package, run, and share your applications consistently across different environments.