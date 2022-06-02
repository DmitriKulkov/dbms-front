import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async getAll(): Promise<User[]> {
    const user = await this.usersRepo.find({
      loadRelationIds: true,
    });
    return user;
  }

  async getOne(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new HttpException(
        `user with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async create(dto) {
    const stock = this.usersRepo.create(dto);
    await this.usersRepo.save(stock);
    return stock;
  }

  async update(dto) {
    // check product id existing
    const user = await this.usersRepo.findOne(dto.id);
    if (!user) {
      throw new HttpException(
        `user with id = ${dto.productId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.usersRepo.update(dto, { id: dto.id });
    return dto;
  }

  async delete(id: number) {
    const stock = await this.usersRepo.findOne({ where: { id: id } });
    if (!stock) {
      throw new HttpException(
        `stock with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersRepo.delete({
      id: id,
    });
    return stock;
  }
}
