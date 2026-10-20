# ⚡ ChargeGrid – Backend

> NestJS backend practice built on Apify's in-memory document DB

REST API for a network of electric vehicle charging stations in the Czech Republic.
This repository is a technical screening assignment for Apify.

![Node](https://img.shields.io/badge/node-24%20LTS-339933?logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/tested%20with-Vitest-6E9F18?logo=vitest&logoColor=white)

---

## Contents

- [Domain](#domain)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [API](#api)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Status](#status)

## Domain

The API manages two entities:

| Entity       | Fields                                  | Notes                                                                 |
| ------------ | --------------------------------------- | --------------------------------------------------------------------- |
| **Location** | `_id`, `name`, `city`, `region`         | `region` is one of the 14 Czech regions (e.g. `Jihomoravský kraj`)    |
| **Charger**  | `_id`, `locationId`, `status`           | `status`: `available` · `occupied` · `out_of_service`                 |

Every charger belongs to exactly one location (`locationId`). The API rejects a charger
that points to a location that does not exist.
IDs are 24-character hex strings in the same format as a MongoDB ObjectId.

## Tech stack

- **[NestJS 12](https://nestjs.com/)** – modules, controllers and services with dependency injection
- **TypeScript 6** in strict mode, native ES modules
- **[class-validator](https://github.com/typestack/class-validator)** – request validation through a global `ValidationPipe`
- **[@apify/hiring-document-database](https://github.com/apify/hiring-in-memory-document-database)** – a minimal, MongoDB-like in-memory document database
- **Vitest** for tests, **oxlint** for linting, **Prettier** for formatting

## Getting started

### Prerequisites

- **Node.js 24 LTS** (tested on 24.22.0) and npm 11
- **Git**: the document database is installed straight from GitHub

### Install & run

```bash
npm install
npm run start:dev
```

The API listens on `http://localhost:3000`. Set the `PORT` environment variable to use a different port.

> [!NOTE]
> **Windows users:** npm builds `@apify/hiring-document-database` while installing it, and its
> build script calls `rm -rf`, which `cmd.exe` does not have. Run the install through Git Bash:
>
> ```powershell
> npm install --script-shell "C:\Program Files\Git\bin\bash.exe"
> ```

## API

Both resources have the same CRUD endpoints. Request bodies are validated. When a body has
an unknown field or an invalid value, the API responds with `400 Bad Request`.

### Locations

| Method   | Endpoint          | Description              | Success |
| -------- | ----------------- | ------------------------ | ------- |
| `GET`    | `/locations`      | List all locations       | `200`   |
| `GET`    | `/locations/:id`  | Get one location         | `200`   |
| `POST`   | `/locations`      | Create a location        | `201`   |
| `PATCH`  | `/locations/:id`  | Partially update         | `200`   |
| `DELETE` | `/locations/:id`  | Delete a location        | `204`   |

### Chargers

| Method   | Endpoint                         | Description                    | Success |
| -------- | -------------------------------- | ------------------------------ | ------- |
| `GET`    | `/chargers`                      | List all chargers              | `200`   |
| `GET`    | `/chargers?locationId=<id>`      | List chargers at one location  | `200`   |
| `GET`    | `/chargers/stats`                | Status counts for the dashboard | `200`  |
| `GET`    | `/chargers/stats?locationId=<id>`| Status counts for one location | `200`   |
| `GET`    | `/chargers/:id`                  | Get one charger                | `200`   |
| `POST`   | `/chargers`                      | Create a charger               | `201`   |
| `PATCH`  | `/chargers/:id`                  | Partially update               | `200`   |
| `DELETE` | `/chargers/:id`                  | Delete a charger               | `204`   |

When an ID does not exist, the API responds with `404 Not Found`.

### Dashboard stats

`GET /chargers/stats` returns charger counts by status, for the whole network or
for one location (`?locationId=<id>`). The API computes them on every request,
so they always match the current data.

```json
{
  "total": 8,
  "available": 4,
  "occupied": 3,
  "outOfService": 1,
  "availabilityPct": 50
}
```

### Examples

```bash
# List all locations
curl http://localhost:3000/locations

# Create a location
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -d '{"name":"Liberec – Forum","city":"Liberec","region":"Liberecký kraj"}'

# Chargers at OC Chodov
curl "http://localhost:3000/chargers?locationId=6650a1000000000000000001"

# Mark a charger as occupied
curl -X PATCH http://localhost:3000/chargers/6650c1000000000000000001 \
  -H "Content-Type: application/json" \
  -d '{"status":"occupied"}'
```

<details>
<summary>Example validation error</summary>

```json
{
  "message": [
    "locationId must be a mongodb id",
    "status must be one of the following values: available, occupied, out_of_service"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

</details>

## Project structure

```
src/
├── main.ts                     # bootstrap + global ValidationPipe
├── app.module.ts               # root module
├── common/
│   └── generate-id.ts          # ObjectId-like ID generator
├── db/
│   └── db.module.ts            # global Database provider, seeded with fake data
├── locations/
│   ├── dto/                    # create / update DTOs with validation rules
│   ├── location.entity.ts      # Location model + list of Czech regions
│   ├── locations.controller.ts
│   ├── locations.service.ts
│   ├── locations.module.ts
│   └── locations.fake-data.ts  # seed data
└── chargers/
    ├── dto/
    ├── charger.entity.ts       # Charger model + statuses
    ├── charger-stats.ts        # pure stats calculation (+ unit tests)
    ├── chargers.controller.ts
    ├── chargers.service.ts
    ├── chargers.module.ts
    └── chargers.fake-data.ts   # seed data
```

## Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run start:dev`  | Start in watch mode                |
| `npm run start:prod` | Run the compiled build from `dist` |
| `npm run build`      | Compile to `dist/`                 |
| `npm test`           | Unit tests                         |
| `npm run test:e2e`   | End-to-end tests                   |
| `npm run test:cov`   | Tests with a coverage report       |
| `npm run lint`       | Lint with oxlint                   |
| `npm run format`     | Format with Prettier               |

## Status

🚧 **Work in progress.** The requirements arrive step by step and get implemented one at a time.

- [x] Project setup (NestJS 12, TypeScript, Vitest, oxlint)
- [x] `Location` and `Charger` modules with CRUD and validation
- [x] Seed data for 5 locations and 8 chargers
- [x] Persistence in `@apify/hiring-document-database` (in memory, reset on restart)
- [x] Dashboard stats endpoint (`GET /chargers/stats`)
- [ ] Unit and e2e tests for both modules (so far only the stats calculation has tests)
