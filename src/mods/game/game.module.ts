import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { ApiLoggerModule } from '../logger/api-logger.module';

@Module({
  controllers: [GameController],
  imports: [TypeOrmModule.forFeature([GameEntity]), ApiLoggerModule],
  providers: [GameService],
})
export class GameModule {}
