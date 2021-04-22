import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface ICreateConnection {
  id?: string;
  admin_id?: string;
  user_id: string;
  socket_id: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({
    id,
    admin_id,
    user_id,
    socket_id,
  }: ICreateConnection): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      admin_id,
      user_id,
      socket_id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
  
  async findByUserId(user_id: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }
}

export { ConnectionsService };