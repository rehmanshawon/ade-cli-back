/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysUser } from './modules/sys-users/models/sys-users.model';
import { UserModule } from './modules/sys-users/sys-users.module';
import { AuthModule } from './modules/sys-auth/sys-auth.module';
import { ConfigModule } from '@nestjs/config';
import { SysRolesModule } from './modules/sys_roles/sys_roles.module';
import { SysRole } from './modules/sys_roles/models/sys-roles.model';
import { CreateTableModule } from './helpers/create-table/create-table.module';
import { UsersService } from './modules/sys-users/sys-users.service';
//import { DatabaseModule } from './core/database/database.module';
import { TeamsModule } from './modules/teams/teams.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT=='mysql'?`mysql`:process.env.DB_DIALECT=='postgres'?`postgres`:process.env.DB_DIALECT=='oracle'?`oracle`:'mssql',
      host: process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,      
      // modelMatch: (filename, member) => {
      //   return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
      // },
      // models: [__dirname +'./models/*.model.ts'],
      models: [SysUser, SysRole],
    }),
    UserModule,
    AuthModule,
    SysRolesModule,
    CreateTableModule,
    TeamsModule,
   // DatabaseModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
