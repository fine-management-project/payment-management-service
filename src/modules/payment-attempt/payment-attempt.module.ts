import { Module } from '@nestjs/common';
import { FineModule } from '../fine/fine.module';
import { StripeModule } from 'src/integrations/stripe/stripe.module';
import { AdminPaymentAttemptController } from './controllers/admin-payment-attempt.controller';
import { PayController } from './controllers/pay.controller';
import { PaymentAttemptController } from './controllers/payment-attempt.controller';
import { PaymentWebhookController } from './controllers/payment-webhook.controller';
import { AdminPaymentAttemptService } from './services/admin-payment-attempt.service';
import { PayService } from './services/pay.service';
import { PaymentAttemptService } from './services/payment-attempt.service';
import { PaymentAttemptRepository } from './repositories/payment-attempt.repository';
import { UserAccessService } from 'src/common/services/user-access.service';
import { PrismaModule } from 'src/integrations/prisma/prisma.module';
import { PaymentAttemptNotificationsService } from './services/event-producers/payment-attempt-notifications/payment-attempt-notifications.service';
import { SnsClientModule } from 'src/integrations/events/producer/sns-client/sns-client.module';

@Module({
  imports: [FineModule, StripeModule, PrismaModule, SnsClientModule],
  providers: [
    AdminPaymentAttemptService,
    PayService,
    PaymentAttemptService,
    PaymentAttemptRepository,
    UserAccessService,
    PaymentAttemptNotificationsService,
  ],
  controllers: [
    AdminPaymentAttemptController,
    PayController,
    PaymentAttemptController,
    PaymentWebhookController,
  ],
})
export class PaymentAttemptModule {}
