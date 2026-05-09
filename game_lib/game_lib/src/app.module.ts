import { Module } from '@nestjs/common';
import { AuthModule } from './mods/auth/auth.module';
import { GameModule } from './mods/game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from './core/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (_: ConfigService) => ({
        ...dataSourceOptions,
        migrationsRun: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    GameModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env.DATABASE_URL);
  }
}
