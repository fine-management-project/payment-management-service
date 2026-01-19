import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SNSClient } from '@aws-sdk/client-sns';
import { DEFAUlT_SNS_TOPIC, SNS_CLIENT } from 'src/common/shared/constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SNS_CLIENT,
      useFactory: (configService: ConfigService): SNSClient => {
        const region = configService.get<string>('AWS_REGION');
        const accessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        );
        const endpoint = configService.get<string>('AWS_ENDPOINT');

        if (!region || !accessKeyId || !secretAccessKey || !endpoint) {
          throw new Error(
            'Missing AWS SNS configuration: REGION, ACCESS_KEY_ID, AWS_ENDPOINT or SECRET_ACCESS_KEY',
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return new SNSClient({
          region: region,
          endpoint: endpoint,
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: DEFAUlT_SNS_TOPIC,
      useFactory: (configService: ConfigService): string => {
        return configService.get<string>('SNS_TOPIC') ?? '';
      },
      inject: [ConfigService],
    },
  ],
  exports: [SNS_CLIENT, DEFAUlT_SNS_TOPIC],
})
export class SnsClientModule {}
