import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { type Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async create(@Body() credentials: LoginDto, @Res() res: Response) {
    const token = await this.service.create(credentials);
    if (token) return res.status(200).json({ token });
    throw new UnauthorizedException('Access was denied!');
  }
}
