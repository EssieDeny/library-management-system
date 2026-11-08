import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  isbn: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsString()
  @IsNotEmpty()
  genreId: string;
}