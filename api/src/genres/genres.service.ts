import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE a genre
  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  // FIND ALL genres
  async findAll() {
    return this.prisma.genre.findMany({
      include: {
        books: true,
      },
    });
  }

  // FIND ONE genre
  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  // UPDATE a genre
  async update(id: string, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  // DELETE a genre
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}