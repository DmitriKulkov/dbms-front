import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { Not, Repository } from "typeorm";
import { Stock } from "./stock.entity";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) private stocksRepo: Repository<Stock>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async getAll(): Promise<Stock[]> {
    const stock = await this.stocksRepo.find({
      loadRelationIds: true,
    });
    return stock;
  }

  async getOne(id: number) {
    const stock = await this.stocksRepo.findOne(id);
    if (!stock) {
      throw new HttpException(
        `stock with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return stock;
  }

  // probably should create folder with same name or slug
  // in order to organize media files in directories
  async create(dto) {
    try {
      const stock = this.stocksRepo.create(dto);
      await this.stocksRepo.save(stock);
      return stock;
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async update(dto) {
    // check product id existing
    const product = await this.productsRepo.findOne(dto.productId);
    if (!product) {
      throw new HttpException(
        `product with id = ${dto.productId} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // check stock id existing
    const s1 = await this.stocksRepo.findOne({
      where: { id: dto.id },
    });
    if (!s1) {
      throw new HttpException(
        `stock with id = ${dto.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // check in order not to duplicate data
    const s2 = await this.stocksRepo.findOne({
      where: {
        productId: dto.productId,
        color: dto.color,
        size: dto.size,
        id: Not(dto.id),
      },
    });
    if (s2) {
      throw new HttpException(
        `stock with productId = ${dto.productId}, color = ${dto.color}, size = ${dto.size} already exists. Do not create duplications`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.stocksRepo.update({ id: dto.id }, dto);

    return dto;
  }

  async delete(id: number) {
    const stock = await this.stocksRepo.findOne({ where: { id: id } });
    if (!stock) {
      throw new HttpException(
        `stock with id = ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.stocksRepo.delete({
      id: id,
    });
    return stock;
  }
}
