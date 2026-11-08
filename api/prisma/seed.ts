
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the .env file");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create or update the four genres
  const genres = [
    { id: "genre-fiction", name: "Fiction", description: "Fictional stories and novels" },
    { id: "genre-science", name: "Science", description: "Science and scientific discoveries" },
    { id: "genre-history", name: "History", description: "Historical events and accounts" },
    { id: "genre-technology", name: "Technology", description: "Computing and technological innovation" },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  // Create or update sixteen books across the four genres
  const books = [
    { id: "book-001", title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813, genreId: "genre-fiction" },
    { id: "book-002", title: "Things Fall Apart", author: "Chinua Achebe", publishedYear: 1958, genreId: "genre-fiction" },
    { id: "book-003", title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925, genreId: "genre-fiction" },
    { id: "book-004", title: "1984", author: "George Orwell", publishedYear: 1949, genreId: "genre-fiction" },

    { id: "book-005", title: "A Brief History of Time", author: "Stephen Hawking", publishedYear: 1988, genreId: "genre-science" },
    { id: "book-006", title: "The Selfish Gene", author: "Richard Dawkins", publishedYear: 1976, genreId: "genre-science" },
    { id: "book-007", title: "Silent Spring", author: "Rachel Carson", publishedYear: 1962, genreId: "genre-science" },
    { id: "book-008", title: "Cosmos", author: "Carl Sagan", publishedYear: 1980, genreId: "genre-science" },

    { id: "book-009", title: "The Diary of a Young Girl", author: "Anne Frank", publishedYear: 1947, genreId: "genre-history" },
    { id: "book-010", title: "The Wretched of the Earth", author: "Frantz Fanon", publishedYear: 1961, genreId: "genre-history" },
    { id: "book-011", title: "Long Walk to Freedom", author: "Nelson Mandela", publishedYear: 1994, genreId: "genre-history" },
    { id: "book-012", title: "The Guns of August", author: "Barbara W. Tuchman", publishedYear: 1962, genreId: "genre-history" },

    { id: "book-013", title: "The Innovators", author: "Walter Isaacson", publishedYear: 2014, genreId: "genre-technology" },
    { id: "book-014", title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008, genreId: "genre-technology" },
    { id: "book-015", title: "The Code Book", author: "Simon Singh", publishedYear: 1999, genreId: "genre-technology" },
    { id: "book-016", title: "Code", author: "Charles Petzold", publishedYear: 1999, genreId: "genre-technology" },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: book.genreId,
      },
      create: book,
    });
  }

  console.log("Seed completed: 4 genres and 16 books created or updated.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
