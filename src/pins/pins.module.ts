import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from './entities/pin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
})
export class PinsModule {}
