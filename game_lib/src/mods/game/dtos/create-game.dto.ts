import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @IsString()
  @IsNotEmpty()
  review: string;
}
