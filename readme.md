# PARZ - TEST

A cab company calls on PARZ to optimize its very large database.
The customer wishes to visualize its data using graphics on a website.

The test focuses mainly on assessing your SQL and UI/UX knowledge.

All the necessary files and dependencies are already installed.
All you have to do is write the required code in the desired file below the comment.
You'll need to follow the order below. All deliverables will be consulted on a git.

## 1. Install tools (Docker can be used instead of Podman)

1. [Podman](https://podman.io/docs/installation).
2. [Podman compose](https://github.com/containers/podman-compose): `sudo dnf install podman-compose`
3. [NVM](https://garywoodfine.com/install-nvm-node-version-manager-fedora): `nvm install 20.10.0 && nvm use 20.10.0 && nvm alias default 20.10.0`
4. [Yarn](https://yarnpkg.com/getting-started): `corepack enable && corepack install --global yarn@4.0.1`

## 2. Install the APP

1. Install packages: `cd package/app` then `yarn install`
2. Run the app: `yarn dev`
3. The URI: http://localhost:5000

## 3. Install the API

1. Install packages: `cd package/api` then `yarn install`
2. Build the container: `yarn build`
3. Run the container: `yarn dev`
4. The URI: http://localhost:3000
5. In a new terminal, run sql shell: `yarn sh:sql`
6. Populate the database `pg_restore -p 5432 -U main -d main -j 4 datasets/dump.sql`

Useful commands:

- Run a migration: `psql -p 5432 "dbname=main user=main" < migrations/002.up.migrate.sql`
- Connect to the database: `psql -p 5432 "dbname=main user=main"`

## 4. Optimize the database

### 4.1 Reduce the size of the trips table

Complete the SQL script `migrations/002.up.migrate.sql`, to reduce the size of the table `trips` (1.000.000 rows) from
89 MB to at least 73 MB. `migrations/001.up.init.sql` will help you understand the current database schema.

### 4.2 Reduce the size of the trips table

Complete the SQL script `migrations/003.up.migrate.sql`, to rename table/column and create an index.

## 4. Display data

Create a dashboard that displays 2 graphs and 3 kpis on trips table over a specific period.
The data type, graphics, design is up to you. Data must be relevant to the company.

You have to use:

- [MUI](https://mui.com/material-ui/getting-started/)
- [ChartJs](https://react-chartjs-2.js.org/components/chart)

Write your code below the 2 TODOs:

- api: Write the request here
- app: Show graphs here