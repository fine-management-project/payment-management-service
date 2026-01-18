import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PaymentAttemptModule } from './modules/payment-attempt/payment-attempt.module';
import { LoggerModule } from './common/logger/logger.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PaymentAttemptModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
