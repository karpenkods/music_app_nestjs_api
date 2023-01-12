import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.log(error)
  }
}

start()
