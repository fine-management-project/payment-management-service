import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/common/guards/jwt.guard';
import { PaymentAttemptService } from '../services/payment-attempt.service';
import { AuthUser } from 'src/common/types/express';
import { Request } from 'express';
import { PaymentAttemptResponseMapper } from '../mappers/responses/payment-attempt.response.mapper';

@ApiTags('payment-attempts')
@UseGuards(JWTAuthGuard)
@Controller('payment-attempts')
export class PaymentAttemptController {
  constructor(private readonly paymentAttemptService: PaymentAttemptService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get payment attempt by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns payment attempt by id',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Admin access or correct user is required',
  })
  async getPaymentAttemptById(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const user: AuthUser | undefined = request.user;

    const paymentAttempt =
      await this.paymentAttemptService.getPaymentAttemptById(id);

    return PaymentAttemptResponseMapper.toBasicPaymentAttemptResponse(
      paymentAttempt,
    );
  }
}
