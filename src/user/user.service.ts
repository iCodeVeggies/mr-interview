import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as Redis from 'ioredis';
import { validateEmail } from 'utils/validation';

@Injectable()
export class UserService {
  private readonly redis: Redis.Redis;
  private readonly redisSubscriber: Redis.Redis;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.redis = new Redis.Redis({ host: 'redis', port: 6379 });
    this.redisSubscriber = new Redis.Redis({ host: 'redis', port: 6379 });

    this.redisSubscriber.subscribe('CREATE_USER');
    this.redisSubscriber.on('message', (channel, message) => {
      if (channel === 'CREATE_USER') {
        this.handleCreateUserMessage(message);
      }
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id: id } });
  }
  async createUser(user: User) {
    return this.userRepository.save(user);
  }

  async handleCreateUserMessage(message: string) {
    try {
      const { email, firstName, lastName } = JSON.parse(message);

      validateEmail(email);

      const user = new User();
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;

      await this.createUser(user);
    } catch (error) {
      console.error('Error handling CREATE_USER message:', error);
    }
  }
}
