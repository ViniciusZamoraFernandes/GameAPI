import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [AuthService],
})
export class AuthModule {}
