import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Color } from "./color.entity";

@Injectable()
export class ColorService {
  constructor(@InjectRepository(Color) private colorsRepo: Repository<Color>) {}

  async getAll(): Promise<Color[]> {
    const color = await this.colorsRepo.find({
      // loadRelationIds: true,
    });
    return color;
  }

  async getOne(id: number): Promise<Color> {
    const color = await this.colorsRepo.findOne(id);
    if (!color) {
      throw new HttpException(
        `color with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return color;
  }

  async create(dto) {
    const color = this.colorsRepo.create(dto);
    await this.colorsRepo.save(color);
    return color;
  }

  async update(dto) {
    // check product id existing
    const color = await this.colorsRepo.findOne(dto.id);
    if (!color) {
      throw new HttpException(
        `user with id = ${dto.productId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.colorsRepo.update(dto, { id: dto.id });
    return dto;
  }

  async delete(id: number) {
    const color = await this.colorsRepo.findOne({ where: { id: id } });
    if (!color) {
      throw new HttpException(
        `stock with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.colorsRepo.delete({
      id: id,
    });
    return color;
  }
  async getColorNames(){
    return this.colorsRepo.find({select: ["name"]})
  }
}
