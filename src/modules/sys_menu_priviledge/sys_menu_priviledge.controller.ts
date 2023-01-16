/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../sys-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysMenuPriviledgeService } from './sys_menu_priviledge.service';
import { CreateSysMenuPriviledgeDto } from './dto/create-sys_menu_priviledge.dto';
import { UpdateSysMenuPriviledgeDto } from './dto/update-sys_menu_priviledge.dto';

@Controller('sys_menu_priviledge')
export class SysMenuPriviledgeController {
  constructor(
    private readonly sysMenuPriviledgeService: SysMenuPriviledgeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createSysMenuPriviledgeDto: CreateSysMenuPriviledgeDto[],
    @Request() req,
  ) {
    return this.sysMenuPriviledgeService.create(
      createSysMenuPriviledgeDto,
      req.user,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('menus')
  findMenusByRoleModule(@Query() params: any, @Request() req) {
    const { role_id, module_id, active } = params;
    console.log(role_id, module_id, active);
    //return params;
    return this.sysMenuPriviledgeService.findMenusByRoleModule(
      role_id,
      module_id,
      active,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const {
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
    } = req.query;

    return await this.sysMenuPriviledgeService.findAll(
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Query() params: any, @Request() req) {
    // if (params.role_id) return false;
    return this.sysMenuPriviledgeService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSysMenuPriviledgeDto: UpdateSysMenuPriviledgeDto,
    @Request() req,
  ) {
    return this.sysMenuPriviledgeService.update(
      +id,
      updateSysMenuPriviledgeDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.sysMenuPriviledgeService.remove(+id, req.user);
  }
}
