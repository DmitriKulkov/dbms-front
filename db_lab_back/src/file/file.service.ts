import { Injectable } from "@nestjs/common";

@Injectable()
export class MediaService {
  upload(files: Array<Express.Multer.File>) {
    console.log(files);
    return;
  }
}
