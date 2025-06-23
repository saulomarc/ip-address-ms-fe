FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# default port for vite is 5173
EXPOSE 5173

# exposing host 0.0.0.0 made it work on with docker run
CMD ["npm", "run", "dev", "--", "--host"]