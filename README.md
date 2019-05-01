# Coding challenge savvy.io

# Steps to run this project:

1. Run `docker-compose build` command
2. Execute migrations `docker-compose run app yarn run typeorm migration:run` file
3. Run `docker-compose up` command

# To execute tests:
`docker-compose run app yarn test`

# Future Enhancements
1. Apply caching strategy for exchange rates prices, which will be updated in regular intervals using background jobs
2. Use pagination while fetching/updating exchange rates for coin market API, as of know I just used limit 200
3. Use background jobs to track transactions status and update in DB
4. Use bearer strategy authentication mechanism using passport
5. Add unit tests, as of know I added integration tests only as we are majorly interacting with third party APIs
6. Also, I didn't get a chance to maintain proper git strategy but usually I follow this git workflow https://github.com/thoughtbot/guides/tree/master/protocol/git.

# Dependencies used
1. `winston`: universal logging library with support for multiple transports
2. `chai/chai-http/mocha`: JavaScript test framework anf assertions
3. `tslint`: linter for the TypeScript
4. `babel`: from compiling typescripts into .js. Under this task, I need babel to create and run typeORM migrations
5. `axios`: making http requests
6. `class-validator`: applying validations with validator.js support
7. `ethereumjs-tx`: managing ethereum transactions
8. `etherscan-api`: API to etherscan
9. `express`: Web framework
10. `joi`: Object schema validation for controller requests
11. `moment`: Date based operations
12. `pg`: PostgreSQL client
13. `typeorm`: Data-Mapper ORM for TypeScript
14. `web3`: Ethereum JavaScript API
