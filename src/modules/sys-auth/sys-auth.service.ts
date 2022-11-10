/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SysUsersService } from 'src/modules/sys_users/sys_users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SysUsers } from '../sys_users/sys_users.model';
import { CreateSysUsersDto } from '../sys_users/dto/create-sys_users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: SysUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // console.log(user);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  async login(user: any) {
    const payload = {
      name: user.user_name,
      email: user.email,
      sub: user.id,
      role: user.role_id,
    };
    //console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async create(user: CreateSysUsersDto) {
    // console.log(user);
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.usersService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
