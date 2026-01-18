import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Fine as FineEntity } from 'src/modules/fine/domain/entities/fine.entity';
import { PaymentAttemptId } from 'src/modules/payment-attempt/domain/value-objects/payment-attempt-id.vo';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripeClient: Stripe;
  private readonly secret: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('SK_STRIPE')!;
    this.stripeClient = new Stripe(this.secret, {
      apiVersion: '2025-12-15.clover',
    });
  }

  async createIntent(fine: FineEntity, paymentAttemptId: PaymentAttemptId) {
    return this.stripeClient.paymentIntents.create({
      amount: fine.amount.value * 100,
      currency: fine.currency,
      metadata: {
        fineId: fine.id.value,
        paymentAttemptId: paymentAttemptId.value,
      },
    });
  }

  constructEvent(request: Request, signature?: string) {
    console.log('request', request.rawBody);
    return this.stripeClient.webhooks.constructEvent(
      request.rawBody,
      signature ?? '',
      this.configService.get<string>('WEBHOOK_SECRET_STRIPE')!,
    );
  }
}
