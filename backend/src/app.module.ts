import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { CdpModule } from './cdp/cdp.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AccountModule,
    TransferModule,
    CdpModule,
    CustomerModule,
  ],
})
export class AppModule {}
