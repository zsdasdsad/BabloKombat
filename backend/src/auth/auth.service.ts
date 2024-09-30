import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) {}


    async validateUser(Dto: { username: string; password: string }) {
        const { username, password } = Dto;
        const user = await this.databaseService.user.findFirst({
            where: {
                username
            }
        });

        if (user && user.password === password) {
            const token = this.jwtService.sign({userId: user.id});
            return { success: true, userId: user.id, token:token };
        } else {
            return { success: false };
        }
    }
}
