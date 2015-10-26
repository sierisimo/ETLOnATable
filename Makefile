DEBUG=app,fetcher,parser

test:
	@./node_modules/.bin/mocha --reporter spec

.PHONY: test
