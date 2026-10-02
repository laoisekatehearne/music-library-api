# Music Library API

A music library backend built with Node.js, Express and SQLite. It stores artists, albums and songs in a relational database and serves data through an API.

## Technologies

- JavaScript
- Node.js and Express
- SQLite
- Postman for API testing

## Database structure

- Artists: name, genre and monthly listeners.
- Albums: name, release year, number of listens and associated artist.
- Songs: name, release year and associated album.

Each artist can have multiple albums, and each album can have multiple songs. Foreign keys connect these records, with cascading deletes configured in the database.

## Getting started

You will need Node.js and npm installed.

Download or clone this repository, then open a terminal in the project folder containing `package.json`.

### 1. Install dependencies

```bash
npm install
```

If Windows PowerShell blocks npm, use `npm.cmd install`.

### 2. Create the database

```bash
node setup-db.js
```

This creates `data/app.db` with sample artists, albums and songs. If the database already exists, the script leaves it unchanged.

### 3. Start the server

```bash
node server.js
```

The server runs at `http://localhost:5000`.

### 4. Try the API

Open these addresses in your browser:

- `http://localhost:5000/` — server status.
- `http://localhost:5000/artists` — artist data.

The API returns JSON. This repository contains the backend; it does not include a frontend interface.

## Project structure

- `controllers/` — request-handling logic.
- `routes/` — API route definitions.
- `db.js` — SQLite connection and foreign-key configuration.
- `model.sql` — database schema and sample data.
- `setup-db.js` — initial database setup.
- `server.js` — Express application entry point.

## What I practised

- Building a backend with Node.js and Express.
- Modelling relationships using SQL and foreign keys.
- Organising routes and controllers.
- Working with JSON API responses.
- Testing requests with Postman.
