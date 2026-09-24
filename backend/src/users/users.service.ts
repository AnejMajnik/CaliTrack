import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dtos/login.dto.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        
        const user = this.userRepository.create({ email: dto.email, username: dto.username, password: hashed });
        const saved = await this.userRepository.save(user);
    }

    async findOneByUsername(loginUsername: string) {
        return await this.userRepository.findOne({ where: { username: loginUsername }});
    }
}
