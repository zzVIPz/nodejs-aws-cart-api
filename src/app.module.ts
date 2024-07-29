import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CartEntity, CartItemEntity } from './cart/entities';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [CartEntity, CartItemEntity],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
