# Backend-01: Hasura Learning Project

This project demonstrates Hasura with a React frontend using:
- REST-style interactions
- GraphQL queries and mutations
- GraphQL subscriptions (live updates)
- Access control with Hasura session variables
- Authentication vs Authorization demo
- Remote Schema integration (two remotes)

## Project Structure

- `docker-compose.yml` -> Postgres + Hasura
- `react/` -> React + Rspack frontend
- `react/backend/server.ts` -> Remote Schema 1 (port `4000`)
- `react/backend/server-remote-two.ts` -> Remote Schema 2 (port `5000`)

## Prerequisites

- Docker Desktop
- Node.js 18+ and npm

## 1. Start Hasura + Postgres

From repository root:

```bash
docker-compose up -d
```

Services:
- Hasura Console: `http://localhost:8080`
- Postgres: `localhost:5432`

To stop:

```bash
docker-compose down
```

## 2. Run Frontend

```bash
cd react
npm install
npm run dev
```

Frontend URL:
- `http://localhost:3001`

## 3. Run Remote Schema Servers

Open a second terminal:

```bash
cd react/backend
npm install
npm run start:remote1
```

Open a third terminal:

```bash
cd react/backend
npm run start:remote2
```

Remote endpoints:
- Remote 1: `http://localhost:4000/graphql`
- Remote 2: `http://localhost:5000/graphql`

## 4. Add Remote Schemas in Hasura

In Hasura Console:
- Go to `Remote Schemas` -> `Add`
- Add remote 1 URL:
  - `http://host.docker.internal:4000/graphql` (recommended when Hasura runs in Docker)
  - or `http://localhost:4000/graphql` (if your setup supports it)
- Add remote 2 URL:
  - `http://host.docker.internal:5000/graphql`
  - or `http://localhost:5000/graphql`

## 5. Demo Routes

From `http://localhost:3001`:
- `/` -> Home
- `/rest` -> REST API demo
- `/graphql` -> GraphQL query/mutation demo
- `/graphql-subscription` -> Live users subscription demo
- `/access-control` -> Role-based access demo
- `/remote-schema` -> Hasura + Remote Schema 1
- `/remote-schema-two` -> Hasura + Remote Schema 1 + Remote Schema 2
- `/authen-autho` -> Authentication vs Authorization demo

## Expected Hasura `users` Fields

Most examples assume a `users` table with:
- `id`
- `name`
- `email`

## Notes

- Subscriptions require WebSocket support in Hasura (`/v1/graphql`).
- `AuthenAutho` uses a fake token in `localStorage` for learning purposes.
- Do not use the fake token approach in production.
