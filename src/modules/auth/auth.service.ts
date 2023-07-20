import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { cfg } from 'src/common/configs/env.config';
import { JwtPayload } from './types/jwtPayload.type';
import { ErrorException } from 'src/common/response/error-response';
import code from 'src/common/response/status-code';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  public hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  async updateRefreshToken(userId: number, rt: string): Promise<void> {
    await this.userRepo.save({ id: userId, refreshToken: rt });
  }

  async register(user: RegisterDto) {
    const { email, password, fullName } = user;
    const isExistUser = await this.userRepo.findOneBy({
      email,
    });

    if (isExistUser) {
      throw new ErrorException(
        HttpStatus.CONFLICT,
        code.USER_EXISTED.code,
        code.USER_EXISTED.type,
      );
    }

    const newUser = this.userRepo.create({
      email,
      password: this.hashPassword(password),
      fullName,
    });
    await this.userRepo.save(newUser);
    const tokens = await this.signTokenVerify(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);

    return tokens;
  }

  validateHash(password: string, hash: string): boolean {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compareSync(password, hash);
  }

  async login(user: LoginDto) {
    const find_user = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (!find_user)
      throw new ErrorException(
        HttpStatus.NOT_FOUND,
        code.NOT_FOUND.code,
        code.NOT_FOUND.type,
      );

    if (!this.validateHash(user.password, find_user.password))
      throw new ErrorException(
        HttpStatus.UNAUTHORIZED,
        code.UNAUTHORIZED.code,
        'Wrong password',
      );

    const tokens = await this.signTokenVerify(find_user.id, find_user.email);
    await this.updateRefreshToken(find_user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepo.save({ id: userId, refreshToken: null });
    return true;
  }

  async refresh(userId: number, rt: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user || !user.refreshToken)
      throw new ErrorException(
        HttpStatus.FORBIDDEN,
        code.FORBIDDEN.code,
        code.FORBIDDEN.type,
      );

    if (!(rt === user.refreshToken))
      throw new ErrorException(
        HttpStatus.FORBIDDEN,
        code.FORBIDDEN.code,
        code.FORBIDDEN.type,
      );

    const tokens = await this.signTokenVerify(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async signTokenVerify(userId: number, email: string) {
    const jwtPayload: JwtPayload = {
      userId: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: cfg('SECRET_KEY'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: cfg('SECRET_KEY_REFRESH'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
