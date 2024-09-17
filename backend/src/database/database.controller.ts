import {Controller, Post, Body, Query} from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('db')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('create')
  async create(@Body() createUserDto: { username: string; email: string; password: string }) {
    const { username, email, password } = createUserDto;
    return this.databaseService.user.create({
      data: {
        username,
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
        username
      }
    });

    if (user && user.password === password) {
      return { success: true, message: 'Login successful', userId: user.id };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  }

  @Post('clicks')
  async getClicks(@Body() body: { userId: string }) {
    const { userId } = body;
    if (!userId) {
      return { clicks: 1000 };
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return { bablo: user.bablo };
    } else {
      return { bablo: 0 };
    }
  }

  @Post('saveBablo')
  async saveBablo(@Body() body: { userId: string; bablo: number }) {
    const { userId, bablo } = body;
    if (!userId) {
      return { success: false, message: userId };
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        bablo,
      },
    });

    return { success: true, message: 'Bablo saved' };
  }
}
