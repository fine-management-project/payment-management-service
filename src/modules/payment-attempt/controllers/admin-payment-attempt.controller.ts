import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/common/guards/jwt.guard';
import { PaymentAttemptResponseMapper } from '../mappers/responses/payment-attempt.response.mapper';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminPaymentAttemptService } from '../services/admin-payment-attempt.service';
import { GetPaymentAttemptsRequest } from '../dtos/requests/payment-attempt/get-payment-attempts.request';
import { BasePaginatedResponse } from 'src/common/responses/base.response';
import { BasicPaymentResponse } from '../dtos/responses/payment-attempt/payment-attempt.response';
import { BaseResponseMapper } from 'src/common/mappers/base.response.mapper';

@ApiTags('admin/payment-attempts')
@UseGuards(JWTAuthGuard, AdminGuard)
@Controller('admin/payment-attempts')
export class AdminPaymentAttemptController {
  constructor(
    private readonly adminPaymentAttemptService: AdminPaymentAttemptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin: Get payment attempts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns payment attempts',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Admin access is required',
  })
  async getPaymentAttempts(
    @Param('id') id: string,
    @Body() body: GetPaymentAttemptsRequest,
  ): Promise<BasePaginatedResponse<BasicPaymentResponse>> {
    const { data: paymentAttempts, total } =
      await this.adminPaymentAttemptService.getPaymentAttempts(body);

    return BaseResponseMapper.toBasePaginatedResponse(
      paymentAttempts.map(
        PaymentAttemptResponseMapper.toBasicPaymentAttemptResponse,
      ),
      total,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin: Delete payment attempt by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns nothing',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Admin access is required',
  })
  async deleteFine(@Param('id') id: string) {
    await this.adminPaymentAttemptService.deletePaymentAttempt(id);
  }
}
