## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Run migration 
```bash

# run prisma migration with a name `users` which creates table in PostgreSQ and file inside `prisma/migrations`
$ npx prisma migrate dev --name users

# run the comment to update schema
$ npx prisma generate
```