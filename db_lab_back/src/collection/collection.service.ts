import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionService {
    constructor(@InjectRepository(Collection) private collectionRepository: Repository<Collection>){}

    async getAll(){
        const c = await this.collectionRepository.find()
        return c
    }

    async getBySlug(slug: string){
        const c = await this.collectionRepository.findOne({
            where: {slug}
        })
        return c
    }
    
}
