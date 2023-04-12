import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartItems, Carts, Orders, Users } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: ['dist/database/entities/*.entity{.ts,.js}'],
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        }),
        TypeOrmModule.forFeature([Users, Carts, CartItems, Orders]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
