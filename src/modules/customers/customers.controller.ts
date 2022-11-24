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
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './dto/create-customers.dto';
import { UpdateCustomersDto } from './dto/update-customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCustomersDto: CreateCustomersDto, @Request() req) {
      return this.customersService.create(createCustomersDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
      const { attributes,includes,iattributes, page, size, field, search } = req.query;

      return await this.customersService.findAll(attributes, includes, iattributes, page, size, field, search,req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.customersService.findOne(+id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateCustomersDto: UpdateCustomersDto,
      @Request() req,
    ) {
      return this.customersService.update(+id, updateCustomersDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.customersService.remove(+id, req.user);
    }

  }
    