import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private BYPASS_EMAIL = 'usuario@esoft.com';
  private BYPASS_PASSWORD = 'Abc123';

  constructor(
    @InjectRepository(TokenEntity)
    private readonly repo: Repository<TokenEntity>,
  ) {}

  async create(credentials: LoginDto): Promise<string> {
    if (
      credentials.email == this.BYPASS_EMAIL &&
      credentials.password == this.BYPASS_PASSWORD
    )
      return await this.createToken();

    throw new UnauthorizedException('Access was denied!');
  }

  private async createToken(): Promise<string> {
    const t = this.repo.create({});
    return (await this.repo.save(t)).uuid;
  }
}
