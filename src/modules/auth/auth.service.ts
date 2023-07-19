import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { LoginPostDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signTokenVerify(user: LoginPostDTO) {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.email,
      }),
      expiresIn: '1d',
    };
  }

  validateHash(password: string, hash: string): boolean {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compareSync(password, hash);
  }

  async login(user: LoginPostDTO) {
    const find_user = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (find_user && this.validateHash(user.password, find_user.password)) {
      return find_user;
    }
  }
}
