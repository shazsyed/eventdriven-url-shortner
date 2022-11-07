# eventdriven-url-shortner
A URL shortner created upon event driven microservice architecture with frontend developed in ReactJS and backend with NodeJS.

### Web UI
Frontend built using ReactJS and Tailwind CSS

<details>
  <summary>Home</summary>
  <img src="https://i.imgur.com/6oCBSlU.png"> 
</details>

<details>
  <summary>Track Link</summary>
  <img src="https://i.imgur.com/Je8RyMf.png">
</details>

### Application Architecture
There are two microservices each with its own database and all the communication between these services are through RabbitMQ message queues. NGINX is used as a reverse proxy to forward the requests to their respective service and as a web server to serve the client application.

1. Link Management Service
2. Analytics Service

<p align="center">
<img src="https://github.com/shazsyed/eventdriven-url-shortner/blob/main/diagram.png" width="900">
</p>

### Installation

#### 1. Pull the repository on your local machine

```
$ git clone https://github.com/shazsyed/eventdriven-url-shortner
```

#### 2. Creating NGINX & RabbitMQ containers

```
$ docker-compose up --build
```

<ins>**Note**</ins>: Default NGINX port is 80, edit the exposing port for nginx service in ./docker-compose.yml file.

#### 3. Creating docker containers for the services

```
$ cd microservices
$ docker-compose -f LinkManagementService/docker-compose.yml up --build
$ docker-compose -f AnalyticsService/docker-compose.yml up --build
```

**Your Docker containers should look like this**

<img src="https://i.imgur.com/sEqpHwB.png" width="600">

## Shortner should be listening on `http://localhost:80/`

#### My Thoughts

The purpose for this project was to explore microservice architecture and learn how modern applications are developed, during the development of this project I came across problems which were specific to a microservice architecture and learned about some patterns which are implemented to mitigate them. This project became a huge reason for me to learn Typescript and use it frequently in future.

