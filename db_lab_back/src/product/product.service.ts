import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ModelService } from "src/model/model.service";
import {Between, In, Like, Repository} from "typeorm";

import { Product } from "./product.entity";
import {ColorService} from "../color/color.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    private modelService: ModelService,
    private colorService: ColorService,
  ) {}

  async getAll(que: {
    _limit?: number;
    _page?: number;
    _name?: string;
    _sortPrice?: 1 | -1;
    _priceFloor?: number;
    _priceTop?: number;
    _collection?: string;
    _gender?: string;
    _cColors?: string[];
  }) {
    const priceOrder = (que._sortPrice && que._sortPrice == -1)? "DESC":"ASC"
    const cols = await this.colorService.getColorNames()
    const colors = (que._cColors && que._cColors.length > 0)? que._cColors: cols.map((col)=>col.name)
    const products = await this.productsRepo.find({
      relations: ["discount", "model", "color", "files", "model.collection"],
      take: que._limit,
      skip: que._page * que._limit,
      where: {
        model: {
          name: Like(que._name?"%" + que._name + "%":"%"),
          collection: {
            slug: Like(que._collection?"%" + que._collection + "%":"%")
          }
        },
        price: Between(que._priceFloor?que._priceFloor:0, que._priceTop?que._priceTop:10000),
        // gender? : string,
        color:{
          name: In(colors)
        }
      },
      order: {
        price: priceOrder,
      }

    });
    return products;
  }

  async getAllReleased() {
    const products = await this.productsRepo.find({
      select: ["id", "price"],
      where: {
        released: true,
      },
    });
    // и надо как-то возвращать скидку равную нулю если даты не наступили...
    //
    return products;
  }

  async getOne(id: number) {
    const product = await this.productsRepo.findOne(id);
    if (!product) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(dto) {
    const p = await this.productsRepo.findOne({ where: { slug: dto.slug } });
    if (p) {
      throw new HttpException(
        "product with such slug already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = this.productsRepo.create(dto);
    await this.productsRepo.save(product);
    return product;
  }

  async update(dto) {
    const product = await this.productsRepo.save({ id: dto.id, ...dto });

    return product;
  }

  async delete(id: number) {
    const p = await this.productsRepo.findOne(id);
    if (!p) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    await this.productsRepo.delete(id);
    return p;
  }

  async getByCollection(collection: string, que: { _limit: number; _page: number; }){
    const model = this.modelService.getByCollection(collection)
    const p = this.productsRepo.find({
      where: {model}, 
      relations: ["discount", "model", "color", "files"],
      take: que._limit,
      skip: que._page * que._limit,
    })

    return p
  }
}
