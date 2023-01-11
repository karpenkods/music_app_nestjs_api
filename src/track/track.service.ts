import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { FileService, FileType } from 'src/file/file.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CreateTrackDto } from './dto/create-track.dto'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { Track, TrackDocument } from './schemas/track.shema'

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(
    createTrackDto: CreateTrackDto,
    picture: { originalname: string; buffer: string | NodeJS.ArrayBufferView },
    audio: { originalname: string; buffer: string | NodeJS.ArrayBufferView },
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    })
    return track
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count))
    return tracks
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments')
    return track
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id)
    return track.id
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createCommentDto.trackId)
    const comment = await this.commentModel.create({ ...createCommentDto })
    track.comments.push(comment.id)
    await track.save()
    return comment
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id)
    track.listens += 1
    track.save()
    return track
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    })
    return tracks
  }
}
