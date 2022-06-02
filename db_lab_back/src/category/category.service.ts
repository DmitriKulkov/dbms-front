import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>){}

    getAll(){
        const c = this.categoryRepo.find()
        return c;
    }
}
