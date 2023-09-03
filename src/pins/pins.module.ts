import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from './entities/pin.entity';
import { PinsService } from './pins.service';
import { PinsController } from './pins.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
  providers: [PinsService],
  controllers: [PinsController],
})
export class PinsModule {}
