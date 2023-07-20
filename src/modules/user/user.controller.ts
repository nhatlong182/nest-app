import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendResponse } from 'src/common/response/send-response';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() query) {
    const allUsers = await this.usersService.getAll(query);
    return SendResponse.success(allUsers);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUser(id);
    return SendResponse.success(user);
  }
}
