import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1778274339976 implements MigrationInterface {
    name = 'MigrationName1778274339976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "tipo" character varying NOT NULL, "nota" integer NOT NULL, "review" character varying NOT NULL, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "games"`);
    }

}
