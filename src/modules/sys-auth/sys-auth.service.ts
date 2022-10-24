/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/sys-users/sys-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        console.log(user);
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
        const payload = { email: user.email, sub: user.userId };
        console.log(payload);
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      public async create(user: any) {
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
