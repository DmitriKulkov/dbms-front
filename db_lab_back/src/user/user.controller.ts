import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UsersService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get("/")
  getAll() {
    return this.userService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() dto) {
    return this.userService.create(dto);
  }

  @Put()
  update(@Body() dto) {
    return this.userService.update(dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
