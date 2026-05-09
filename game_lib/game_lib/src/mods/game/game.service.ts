import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateGameDto } from './dtos/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity) private readonly repo: Repository<GameEntity>,
  ) {}

  async create(game: CreateGameDto) {
    return await this.repo.save(game);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneByOrFail({ id });
  }

  async update(id: number, game: UpdateGameDto) {
    await this.repo.update(id, game);
    return await this.findOne(id);
  }

  async revoke(id: number) {
    try {
      await this.findOne(id);
      return await this.repo.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
