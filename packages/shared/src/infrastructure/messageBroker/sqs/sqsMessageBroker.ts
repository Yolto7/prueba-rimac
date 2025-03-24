import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

import { Logger } from '../../../domain/logger';
import { MessageBroker } from '../../../domain/messageBroker';
import { DOORMAN_CONSTANTS } from '../../../domain/constants';
import { AsyncContext, RequestAsyncContext, SysTokenAsyncContext } from '../../context';

export class SqsMessageBroker implements MessageBroker {
  private readonly client;

  constructor(private readonly logger: Logger) {
    this.client = new SQSClient();
    this.logger.info(`SQS client created`);
  }

  async publish<T>(topic: string, data: T): Promise<void> {
    const body = JSON.stringify({
      data,
      context: AsyncContext.get<RequestAsyncContext>(DOORMAN_CONSTANTS.ASYNCCONTEXT.REQUEST),
      sysTokenContext: AsyncContext.get<SysTokenAsyncContext>(
        DOORMAN_CONSTANTS.ASYNCCONTEXT.SYS_TOKEN
      ),
    });

    await this.client.send(
      new SendMessageCommand({
        QueueUrl: topic,
        MessageBody: body,
      })
    );

    this.logger.info(`Message sent to ${topic} with body ${body}`);
  }
}
