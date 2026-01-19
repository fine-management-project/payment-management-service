import { ConfigService } from '@nestjs/config';
import {
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
  SNSClient,
} from '@aws-sdk/client-sns';
import { Inject, Injectable } from '@nestjs/common';
import { BaseEventDto } from '../base.event.dto';
import { ProducerService } from '../types';
import { DEFAUlT_SNS_TOPIC, SNS_CLIENT } from 'src/common/shared/constants';

@Injectable()
export abstract class BaseEventProducerService {
  @Inject(SNS_CLIENT)
  protected readonly snsClient: SNSClient;
  protected readonly serviceName: ProducerService.paymentManagementService;
  @Inject(DEFAUlT_SNS_TOPIC)
  protected readonly defaultSnsTopic: string;

  constructor() {}

  protected createSendCommand<T>(
    event: BaseEventDto<T, ProducerService.paymentManagementService>,
  ): PublishCommand {
    const commandInput: PublishCommandInput = {
      TopicArn: this.defaultSnsTopic,
      Message: event.getPayloadJSON(),
      MessageAttributes: event.getMessageAttributes(),
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return new PublishCommand(commandInput);
  }

  protected async publishEvent<T>(
    event: BaseEventDto<T, ProducerService.paymentManagementService>,
  ): Promise<PublishCommandOutput> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const command: PublishCommand = this.createSendCommand<T>(event);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.snsClient.send(command);
  }
}
