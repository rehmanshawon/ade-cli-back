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
} from '@nestjs/common';
import { JwtAuthGuard } from '../sys-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { SysRoleModuleService } from './sys_role_module.service';
import { CreateSysRoleModuleDto } from './dto/create-sys_role_module.dto';
import { UpdateSysRoleModuleDto } from './dto/update-sys_role_module.dto';

@Controller('sys_role_module')
export class SysRoleModuleController {
  constructor(private readonly sysRoleModuleService: SysRoleModuleService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSysRoleModuleDto: CreateSysRoleModuleDto, @Request() req) {
      return this.sysRoleModuleService.create(createSysRoleModuleDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

      return await this.sysRoleModuleService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.sysRoleModuleService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateSysRoleModuleDto: UpdateSysRoleModuleDto,
      @Request() req,
    ) {
      return this.sysRoleModuleService.update(+id, updateSysRoleModuleDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.sysRoleModuleService.remove(+id, req.user);
    }

  }
    