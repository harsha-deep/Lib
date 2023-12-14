FROM node:21

WORKDIR /app
RUN npm install -g nodemon

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm ci
COPY . /app
EXPOSE 5002

CMD ["nodemon", "server"]
