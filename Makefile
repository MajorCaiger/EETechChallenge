install-client:
	cd client && yarn install

install-api:
	cd api && npm install

test-unit-client:
	cd client && npm run test

test-unit-api:
	cd api && npm run test

test-int-client:
	cd client && npm run test:int

test-unit: test-unit-client test-unit-api
test-int:
	cd api && DB_PASSWORD="password" npm run test:int
install: install-client install-api

start:
	docker-compose up --remove-orphans

start-detached:
	docker-compose up -d --remove-orphans

stop:
	docker-compose down

storybook:
	cd client && npm run storybook
