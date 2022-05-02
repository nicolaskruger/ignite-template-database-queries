import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genres } from '../../genres/entities/Genres';
import { Order } from '../../orders/entities/Orders';
import { User } from '../../users/entities/User';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToMany(()=> Genres, genres => genres.games)
  genres: Genres[];

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Order, order => order.games)
  orders: Order[]

  @UpdateDateColumn()
  updated_at: Date;
}
