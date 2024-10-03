import {Controller, Post, Body, Get} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UPGRADE_COSTS } from '../UPGADE_COSTS';

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
        upgrades: {
          create: {
            click: 0,
            auto: 0,
            crypto: 0,
            manager: 0,
            bank: 0,
            factory: 0,
          }
        },
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

  @Get('test')
  async test(){
    const user = await this.databaseService.user.findMany({
    });
    const upgrades = await this.databaseService.upgrades.findMany({});
    return [user,upgrades];
  }

  @Get('secret')
  async secret(){
    const user = await this.databaseService.user.findUnique({
      where: {id: "cm1tkh3gk0000pqna8nfe98df",}
    });
    const bablo = 1000000;
    await this.databaseService.user.update({where:{id:"cm1tkh3gk0000pqna8nfe98df"},data:{bablo}});
    return user;
  }

  @Post('upgrade')
  async upgrade(@Body() body: { userId: string; upgrade: string }) {
    const { userId, upgrade } = body;

    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: { upgrades: true },
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const currentLevel = user.upgrades[upgrade];
    const cost = UPGRADE_COSTS[`${upgrade}`] * (1 + 0.2 * currentLevel);

    if (user.bablo < cost) {
      return { success: false, message: 'Not enough bablo' };
    }

    const newLevel = currentLevel + 1;
    const newBablo = user.bablo - cost;

    await this.databaseService.user.update({
      where: { id: userId },
      data: {
        bablo: newBablo,
        upgrades: {
          update: {
            [upgrade]: newLevel,
          },
        },
      },
    });

    return {
      success: true,
      old_lvl: currentLevel,
      new_lvl: newLevel,
      current_balance: newBablo,
    };
  }
}
