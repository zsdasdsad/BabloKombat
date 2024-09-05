import { Controller, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('db')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('create')
  async create(@Body() createUserDto: { username: string; email: string; password: string }) {
    const { username, email, password } = createUserDto;
    return this.databaseService.user.create({
      data: {
        name: username,
        email,
        password,
      },
    });
  }

  @Post('login')
  async login(@Body() loginUserDto: { username: string; password: string }) {
    const { username, password } = loginUserDto;
    const user = await this.databaseService.user.findFirst({
      where: {
        name: username,
      }
    });

    if (user && user.password === password) {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  }
}