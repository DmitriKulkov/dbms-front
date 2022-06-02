import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ColorService } from "./color.service";

@Controller("colors")
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Get("/")
  getAll() {
    return this.colorService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.colorService.getOne(id);
  }

  @Post()
  create(@Body() dto) {
    return this.colorService.create(dto);
  }

  @Put()
  update(@Body() dto) {
    return this.colorService.update(dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.colorService.delete(id);
  }
}
