DEBUG=app,fetcher

test:
	@./node_modules/.bin/mocha --reporter spec

.PHONY: test
