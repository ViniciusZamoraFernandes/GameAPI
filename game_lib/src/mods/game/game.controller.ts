import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateGameDto } from './dtos/update-game.dto';
import { type Response } from 'express';
import { ApiLoggerService } from '../logger/api-logger.service';

@Controller('jogos')
export class GameController {
  constructor(
    private readonly service: GameService,
    private readonly logger: ApiLoggerService,
  ) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto, @Res() res: Response) {
    try {
      const game = await this.service.create(createGameDto);
      return res.status(201).json(game);
    } catch (err) {
      this.logger.error('creating game');
      throw new BadRequestException('No valid data was provided');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (err) {
      this.logger.error('listing games', err);
      throw new BadRequestException('Could not list games');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (err) {
      this.logger.error('searching game', err);
      throw new NotFoundException('game was not found');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
    @Res() res: Response,
  ) {
    try {
      const updatedGame = await this.service.update(+id, updateGameDto);
      console.log(id, updatedGame)
      return res.status(200).json(updatedGame);
    } catch (err) {
      this.logger.error('updating game', err);
      throw new BadRequestException('Could not update game');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.service.revoke(+id);
      return res.status(204).send();
    } catch (err) {
      this.logger.error(`revoking game with id ${id}`, err);
      throw new NotFoundException('Data was not found');
    }
  }
}
