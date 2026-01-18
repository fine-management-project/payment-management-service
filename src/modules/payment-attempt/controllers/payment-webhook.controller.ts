import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayService } from '../services/pay.service';
import { Request } from 'express';

@ApiTags('payments')
@Controller('payments')
export class PaymentWebhookController {
  constructor(private readonly payService: PayService) {}

  @Post('/webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Webhook for stripe' })
  async getPaymentAttempts(
    @Req() request: Request,
    @Headers('stripe-signature') stripeSignature: string,
  ) {
    await this.payService.handleStripeWebhook(request, stripeSignature);
  }
}
