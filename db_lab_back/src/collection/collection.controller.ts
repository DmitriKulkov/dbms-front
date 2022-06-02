import { Controller, Get, Param } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService){}

    @Get()
    getAll(){
        return this.collectionService.getAll()
    }

    @Get("/slug/:slug")
    getBySlug(@Param("slug") slug: string){
        return this.collectionService.getBySlug(slug)
    }
}
