import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumModule } from './album/album.module'
import { FileModule } from './file/file.module'
import { TrackModule } from './track/track.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://karpenkods:admin@cluster-music.mrupd0z.mongodb.net/?retryWrites=true&w=majority',
    ),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
})
export class AppModule {}

