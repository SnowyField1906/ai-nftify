import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { UserService } from "src/services";
import { User } from "src/schemas";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(":owner")
  async getUserById(@Param("owner") owner: string): Promise<User> {
    const user = await this.userService.findUserById(owner);
    if (!user) {
      throw new NotFoundException(`Can not find metadata with ${owner}`);
    }
    return user;
  }

  @Get()
  async getAllUsers(): Promise<Array<User>> {
    const user = await this.userService.findAll()
    if (!user) {
      throw new NotFoundException(`Empty metadata`);
    }
    return user;
  }

  @Post()
  async createMetadata(@Body() createUser: CreateUserDto): Promise<User> {
    const existedMetadata = await this.userService.findUserById(createUser.id);
    if (existedMetadata) {
      throw new BadRequestException("Metadata already exists");
    }

    return this.userService.createUser(createUser);
  }

}
