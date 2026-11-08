import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE a book
  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  // FIND ALL books, with optional filtering and pagination
  async findAll(
    genreId?: string,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where = {
      ...(genreId ? { genreId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { author: { contains: search, mode: 'insensitive' as const } },
              { isbn: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    return this.prisma.book.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        genre: true,
      },
    });
  }

  // FIND ONE book
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // UPDATE a book
  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // DELETE a book
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}