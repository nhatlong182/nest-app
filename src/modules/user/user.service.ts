import { CreateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from '../../entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { ErrorException } from 'src/common/response/error-response';
import code from 'src/common/response/status-code';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getAll(query: any) {
    const { page = 1, perPage = 10 } = query;
    const users = await this.userRepo.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const list = users.map((user) => plainToClass(UserDto, user));
    const total = await this.userRepo.count();

    return { list, total, page: page / 1, perPage: perPage / 1 };
  }

  async getUser(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code.NOT_FOUND.code,
        code.NOT_FOUND.type,
      );

    return plainToClass(UserDto, user);
  }

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }
}
