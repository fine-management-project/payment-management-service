import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/common/guards/jwt.guard';
import { PayService } from '../services/pay.service';
import { BaseResponseMapper } from 'src/common/mappers/base.response.mapper';
import { BaseResponse } from 'src/common/responses/base.response';

@ApiTags('pay')
@UseGuards(JWTAuthGuard)
@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post('/fines/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request payment of fine by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns Stripes client secret',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Should be a correct user',
  })
  async getPaymentAttempts(
    @Param('id') id: string,
  ): Promise<BaseResponse<string>> {
    const clientSecret = await this.payService.requestFinePaymentById(id);

    return BaseResponseMapper.toBaseResponse(clientSecret);
  }
}
