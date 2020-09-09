## Mole

An app to share bookmarks with others

### TODO

#### Server Api

- [x] Register
- [x] Login
- [ ] Logout
- [ ] forget-password / change-password

### QA

- How to setup postgres on Mac?

  ```bash
  brew install postgres

  # start the service, also check `brew services list`
  brew services start postgresql

  # init database
  initdb /usr/local/var/postgres

  # createdb
  createdb

  # login in control center with system user
  psql

  # create user postgres
  CREATE USER postgres WITH PASSWORD 'yourpassword' CREATEDB;

  # drop default database that named postgres
  DROP DATABASE postgres;

  # create `postgres` database for user `postgres`
  CREATE DATABASE postgres OWNER postgres;

  # grant privilege
  GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

  # then we can logout and login with user `postgres`
  psql -U postgres -d postgres -h 127.0.0.1 -p 5432
  ```

- Why use `argon2` rather than `bcrypt` or `scypt`?
  > [In 2018, what is the recommended hash to store passwords: bcrypt, scrypt, Argon2?](https://security.stackexchange.com/questions/193351/in-2018-what-is-the-recommended-hash-to-store-passwords-bcrypt-scrypt-argon2)
