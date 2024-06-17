import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../user/entities/user.entity';
import { LoginType } from './types/loginType';
import { Register } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { Login } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  static BCRPYT_SALT_ROUND = 10;
  async register(data: Register, file?: Express.Multer.File): Promise<UserModel> {
    const user = await this.userService.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw new BadRequestException('Mail kullanılmaktadır!');
    }

    const salt = await bcrypt.genSalt(AuthService.BCRPYT_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return await this.userService.create(
      {
        ...data,
        password: hashedPassword,
      },
      file,
    );
  }

  async login(data: Login): Promise<LoginType> {
    const user = await this.userService.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    let compareResult = await bcrypt.compare(data.password, user.password);
    if (!compareResult) {
      throw new Error('Giriş bilgileri yanlış!');
    }

    const { id, name } = user;
    return {
      user: {
        id,
        name,
      },
      token: this.jwtService.sign({ id, name }, { expiresIn: '1y', secret: process.env.JWT_SECRET }),
    };
  }
}
