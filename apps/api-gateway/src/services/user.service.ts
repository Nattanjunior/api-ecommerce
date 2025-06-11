import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'lib/dtos/dto-user-service/create-user-dto';
import { UpdateUserDto } from 'lib/dtos/dto-user-service/update-user-dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  async findAllUsers() {
    return await firstValueFrom(this.userClient.send({ cmd: 'find-all-users' }, {}));
  }

  async findUser(id: string) {
    return await firstValueFrom(this.userClient.send({ cmd: 'find-user' }, id));
  }

  async createUser(data: CreateUserDto) {
    return await firstValueFrom(this.userClient.send({ cmd: 'create-user' }, data));
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return await firstValueFrom(this.userClient.send({ cmd: 'update-user' }, { id, data }));
  }

  async deleteUser(id: string) {
    return await firstValueFrom(this.userClient.send({ cmd: 'delete-user' }, id));
  }
} 