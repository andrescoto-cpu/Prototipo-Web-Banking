import { Module } from '@nestjs/common';
import { CdpController } from './cdp.controller';

@Module({
  controllers: [CdpController],
})
export class CdpModule {}
