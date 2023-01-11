import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const start = async () => {
  try {
    const PORT = process.env.MONGO_URI || 3000
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
