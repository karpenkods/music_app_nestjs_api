import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { MongooseConfigService } from './config/MongooseConfigService'
import configuration from './config/configuration'
import { AlbumModule } from './album/album.module'
import { FileModule } from './file/file.module'
import { TrackModule } from './track/track.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, 'static')}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
})
export class AppModule {}
