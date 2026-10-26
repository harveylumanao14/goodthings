# React + Express + PostgreSQL starter

A JavaScript monorepo with a React frontend (Vite and Tailwind CSS) and an Express API backed by PostgreSQL.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- PostgreSQL (local or hosted, such as Neon)

## Getting started

1. Create a PostgreSQL database, or use an existing hosted database.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` to your database connection string. Keep credentials in `.env`; do not put them in `.env.example` or commit them.
3. Copy `frontend/.env.example` to `frontend/.env` if you want to change the API URL.
4. Install dependencies and start both applications:

   ```sh
   npm install
   npm run dev
   ```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:3001`.

## Scripts

- `npm run dev` — start the frontend and backend in development mode.
- `npm run build` — build the frontend for production.
- `npm start` — start the backend in production mode.

## API

- `GET /api/health` — check that the API is running.
- `GET /api/health/db` — check PostgreSQL connectivity.
- `GET /api/todos` — list starter todos from PostgreSQL.
- `POST /api/todos` — create a todo with a JSON body such as `{"title":"Explore the starter"}`.

Create the starter table once in the database named in `DATABASE_URL`. You can run the schema from the project root with `psql`:

```sh
psql "$DATABASE_URL" -f backend/sql/schema.sql
```

For a PowerShell session, set `$env:DATABASE_URL` to the connection string before running `psql`. Alternatively, run the contents of `backend/sql/schema.sql` in your provider's SQL editor.

The API validates todo titles and uses parameterized SQL queries. Configure the allowed frontend origin with `CORS_ORIGIN` in `backend/.env`.
