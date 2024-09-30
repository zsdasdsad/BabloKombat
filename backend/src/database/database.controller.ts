import {Controller, Post, Body, UseGuards, Req} from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('db')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('create')
  async create(@Body() createUserDto: { username: string; email: string; password: string }) {
    const { username, email, password } = createUserDto;
    const user = await this.databaseService.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return { success: true };
  }

  @Post('clicks')
  async getClicks(@Body() body: { userId: string }) {
    const { userId } = body;
    if (!userId) {
      return { clicks: 0 };
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
