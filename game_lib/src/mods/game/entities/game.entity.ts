import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  tipo: string;

  @Column()
  nota: number;

  @Column()
  review: string;
}
