import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // Endpoint to get all users (accessible by admins only)
  @UseGuards(JwtAuthGuard)
  
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Endpoint to get a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Endpoint to create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint to update an existing user
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Endpoint to delete a user by ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  // Endpoint to find a user by email
  @Get('by-email')
  async findOneByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
