import {Controller, Post, Body, UseGuards, Get, Req} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserService } from "./user.service";


@Controller('user')
@UseGuards(UserService)
export class UserController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('test')
    async protectedRoute(@Req() req) {
        return { user: req.user };
    }

}
