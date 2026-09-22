import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(dto: RegisterDto) {
        return this.usersService.createUser(dto);
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findOneByUsername(dto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { sub: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);

        return token;
    }
}
