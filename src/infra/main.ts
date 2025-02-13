import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT ?? 3333

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: process.env.FRONT_END_URL,
  })

  await app.listen(port)
  console.log("App running on port", port)
}
bootstrap()
