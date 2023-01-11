import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Track } from 'src/track/schemas/track.shema'

export type AlbumDocument = HydratedDocument<Album>

@Schema()
export class Album {
  @Prop()
  name: string
  @Prop()
  author: string
  @Prop()
  picture: string
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)
