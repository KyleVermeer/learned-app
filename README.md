# learned-app

Setup

1.  Clone the git repo

    `git clone git@github.com:KyleVermeer/learned-app.git`

2.  Checkout a new local branch from master
    ~~~~
    # First checkout master, as we want to branch from master
    git checkout master
    # Then create a new branch and checkout it out
    git checkout -b <new branch name>
    ~~~~

3.  Make some changes, add them, then commit them

    ~~~~
    # Make some changes
    ...

    # Add changes to git staging
    git add .

    # Commit your changes
    git commit -m "<Sample commit message>"
    ~~~~

4.  If you need to make more changes, just amend your commit instead of making multiple commits

    ~~~~
    # Amend current commit
    git commit --amend
    ~~~~

5.  Push changes to github

    ~~~~
    # Push changes
    git push origin <Your branch name>
    ~~~~

6.  Create a pull request to have your code reviewed and merged into master

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
