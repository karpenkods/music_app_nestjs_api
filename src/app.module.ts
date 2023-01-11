import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AlbumModule } from './album/album.module'
import { FileModule } from './file/file.module'
import { TrackModule } from './track/track.module'
import * as path from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://karpenkods:admin@cluster-music.mrupd0z.mongodb.net/?retryWrites=true&w=majority',
    ),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
})
export class AppModule {}

