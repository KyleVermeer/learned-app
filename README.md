# learned-app

Setup

1.  Clone the git repo

    `git clone git@github.com:KyleVermeer/learned-app.git`

Front End
=

Built heavily on http://materializecss.com/

Database
=

Production uses
- Heroku Postgres :: Database

Dev uses
- Heroku Postgres :: Red


To run a sql file against heroku:
`cat file.sql | heroku pg:psql`

Testing
=

To run unit and integration tests:

`npm test`

Tests are configuring to put mocking, assertion, and other commonly used libraries into the global namespace, so each test class need not require them.
