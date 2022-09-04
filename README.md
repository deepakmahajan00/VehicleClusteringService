# VehicleCulustringService

## Required technologies
1. NodeJs `Backend api written in NodeJs`
2. Docker
3. Postman `to hit apis`

## Clone repository
git clone `https://github.com/deepakmahajan00/VehicleClusteringService.git`

## Setup local without docker-compose

1. Run `git clone https://github.com/deepakmahajan00/VehicleClusteringService.git`
2. Run `npm install`
3. Run `npm test` to check code-coverage
4. Run `npm start`
5. Hit the server to test health `curl localhost:18010/health` or `http://localhost:18010/health` and expect a `200` response
6. Swagger api-documentation `http://localhost:18010/api-docs`


## Setup with docker-compose

1. Run `git clone https://github.com/deepakmahajan00/VehicleClusteringService.git`
2. Run `docker-compose up`
3. Hit the server to test health `http://localhost:18010/health` and expect a `200` response
4. Swagger api-documentation `http://localhost:18010/api-docs`

## List of APIs
- Docker Setup `http://localhost:18010/api-docs`
- Local Setup `http://localhost:18010/api-docs`