# IP Address MS Frontend Component

This is a Vue 3 application powered by [Vite](https://vitejs.dev/), a fast and modern frontend build tool.

## 📦 Prerequisites

Before you start, ensure you have the following installed:

- [Docker](https://www.docker.com/) installed
- IP Address MS backend(https://github.com/saulomarc/ip-address-ms-be) running separately

And these two if planning to run outside of docker:

- [Node.js](https://nodejs.org/) (version 16.0 or above recommended) 
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow the steps below to set up and run the Vue Application with Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/saulomarc/ip-address-ms-fe
cd ip-address-ms-fe
```

### 2. Copy .env File
```bash
cp .env.example .env
```

### 3. Build the image
```bash
docker build -t vue-app .
```

### 4. Run the image
```bash
docker run -it -p 5173:5173 --rm --name dockerize-vuejs-app-1 vue-app
```

### User Access

Once you have setup the backend component, you should be able to login using the following user credentials:

Admin User Credentials:
- email: admin@example.com
- password: admin12345

Regular User Credentials:
- email: user@example.com
- password: password