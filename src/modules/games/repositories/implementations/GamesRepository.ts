import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where('lower(games.title) like :param ', { param: `%${param.toLowerCase()}%`})
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT count(1) from games GROUP by TRUE;"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return (await this.repository
      .createQueryBuilder('games')
      .innerJoinAndSelect('games.users', 'users')
      .where('games.id = :id', { id })
      .getOne())?.users as User[]
      // Complete usando query builder
  }
}
