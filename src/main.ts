import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    const PORT = Number(process.env.PORT) || 8080
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    await app.listen(PORT);
    Logger.log(`Application is running on http://localhost:${PORT}`);
}

bootstrap();
