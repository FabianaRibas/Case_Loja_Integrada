install:
	cd client && npm install && cd .. && docker-compose up --build

start:
	docker-compose up