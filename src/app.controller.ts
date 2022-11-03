/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/sys-auth/local-auth.guard';
import { AuthService } from './modules/sys-auth/sys-auth.service';
import { JwtAuthGuard } from './modules/sys-auth/jwt-auth.guard';
//import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
