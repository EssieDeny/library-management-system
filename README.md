# Library Management System

A backend API for a library management system, built with NestJS, Prisma ORM, and PostgreSQL.

## Technology Stack

- **NestJS** – Backend application framework
- **Prisma ORM** – Database modelling and queries
- **PostgreSQL** – Relational database
- **TypeScript** – Programming language

## Project Structure

```text
library-management-system/
├── README.md
├── .gitignore
├── .gitattributes
└── api/
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.ts
    │   └── migrations/
    ├── src/
    │   ├── generated/
    │   └── prisma/
    │       └── prisma.service.ts
    ├── .env.example
    ├── package.json
    ├── prisma.config.ts
    └── ...
```

## Database Models

The database includes four models:

- **User** – Stores user details and distinguishes between patrons and librarians using a `Role` enum.
- **Genre** – Stores book genres, including their names and descriptions.
- **Book** – Stores book details and references its genre through a foreign key.
- **Review** – Stores book reviews, linking each review to a user and a book through foreign keys.

## Schema Decisions

The `Book` model references the `Genre` model through `genreId`, rather than embedding genre information directly in each book.

This relational approach avoids duplicating genre names and descriptions across multiple book records. It also makes it easier to maintain consistent genre information, update a genre in one place, and retrieve books belonging to a particular genre.

The relationship is implemented using Prisma's `@relation` attribute, with `genreId` referencing the `id` field in the `Genre` model.

Similarly, the `Review` model references both `User` and `Book` through foreign keys. This allows users to write multiple reviews and books to receive multiple reviews without duplicating review information inside the User or Book records.

## Database Migrations and Seeding

The project uses Prisma Migrate to manage database schema changes.

The migrations create the initial database structure and subsequently add the Review model.

The seed script (`api/prisma/seed.ts`) populates the database with:

- 4 genres
- 16 books distributed across the genres

To apply migrations during development, run from the `api` directory:

```bash
npx prisma migrate dev
```

To populate the database with sample data:

```bash
npx prisma db seed
```

## Environment Configuration

Create a `.env` file inside the `api` directory using `.env.example` as a template.

Set your PostgreSQL connection string in `DATABASE_URL`. Do not commit your actual `.env` file or database credentials.

## Running the API

From the `api` directory, install dependencies:

```bash
npm install
```

Start the application in development mode:

```bash
npm run start:dev
```

## Relational vs Document Database Modelling

In this project, PostgreSQL uses a relational database structure where data is organised into separate tables connected through relationships and foreign keys. Prisma represents these relationships explicitly in the schema.

In a document database such as MongoDB, related information can instead be embedded within documents. For example, book details and related information could be stored together in a single document. This can reduce the need for separate queries, but may introduce data duplication when information is shared across multiple documents.
