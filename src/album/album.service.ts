import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateAlbumDto } from './dto/create-album.dto'
import { Album, AlbumDocument } from './schemas/album.schema'

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private AlbumModel: Model<AlbumDocument>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.AlbumModel.create({
      ...createAlbumDto,
      listens: 0,
    })
    return album
  }

  async getAll(): Promise<Album[]> {
    const albums = await this.AlbumModel.find()
    return albums
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.AlbumModel.findById(id)
    return album
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.AlbumModel.findByIdAndDelete(id)
    return album.id
  }
}
