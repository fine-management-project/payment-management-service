import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FineId } from 'src/modules/fine/domain/value-objects/fine-id.vo';
import { FineDto } from './dtos/fine.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'node_modules/axios/index.cjs';

@Injectable()
export class FineManagementServiceService {
  private _baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this._baseUrl = this.configService.get<string>(
      'FINE_MANAGEMENT_SERVICE_URL',
    )!;
  }

  private async getM2MToken(): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `https://${this.configService.get<string>('AUTH0_DOMAIN')}/oauth/token`,
        {
          client_id: this.configService.get<string>('AUTH0_M2M_CLIENT_ID'),
          client_secret: this.configService.get<string>(
            'AUTH0_M2M_CLIENT_SECRET',
          ),
          audience: this.configService.get<string>(
            'FINE_MANAGEMENT_SERVICE_AUTH0_AUDIENCE',
          ),
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Accept-Encoding': 'identity',
          },
        },
      ),
    );

    return data.access_token;
  }

  async getFineById(fineId: FineId): Promise<FineDto> {
    const response: AxiosResponse<FineDto> = await firstValueFrom(
      this.httpService.get(`${this._baseUrl}/fines/${fineId.value}`, {
        headers: {
          Authorization: `Bearer ${await this.getM2MToken()}`,
        },
      }),
    );

    return response.data;
  }
}
