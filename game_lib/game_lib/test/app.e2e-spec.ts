import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        email: 'usuario@esoft.com',
        password: 'Abc123',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
      });
  });

  it('/jogos (GET)', () => {
    return request(app.getHttpServer())
      .get('/jogos')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/jogos (POST)', () => {
    return request(app.getHttpServer())
      .post('/jogos')
      .send({
        nome: 'Elden Ring',
        tipo: 'RPG',
        nota: 9,
        review: 'Desafiador e visualmente impecável.',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          nome: 'Elden Ring',
          tipo: 'RPG',
          nota: 9,
          review: 'Desafiador e visualmente impecável.',
        });
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/jogos (POST)', () => {
    return request(app.getHttpServer())
      .post('/jogos')
      .send({
        nome: 'Hollow knight',
        tipo: 'Metroidvania',
        nota: 10,
        review: 'Implacavel',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          nome: 'Hollow knight',
          tipo: 'Metroidvania',
          nota: 10,
          review: 'Implacavel',
        });
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/jogos/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/jogos/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('nome');
      });
  });

  it('/jogos/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/jogos/1')
      .send({
        nome: 'Elden Ring DLC',
        tipo: 'RPG',
        nota: 10,
        review: 'Melhorou o que já era perfeito.',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          nome: 'Elden Ring DLC',
          nota: 10,
        });
      });
  });

  it('/jogos/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/jogos/2').expect(204);
  });
});
