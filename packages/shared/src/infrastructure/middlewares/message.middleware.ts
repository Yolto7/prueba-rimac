import { SQSEvent } from 'aws-lambda';

import { DOORMAN_CONSTANTS } from '../../domain/constants';
import { AsyncContext, RequestAsyncContext, SysTokenAsyncContext } from '../context';
import { Logger } from '../../domain/logger';
import { SysTokenMiddleware } from './sysToken.middleware';

export interface MessageRecord {
  body: {
    data: any;
    context?: RequestAsyncContext;
    sysTokenContext?: SysTokenAsyncContext;
  };
}

type Handler = (body: MessageRecord[]) => Promise<void>;

export class MessageMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly sysTokenMiddleware: SysTokenMiddleware
  ) {}

  use(handler: Handler) {
    return async (event: SQSEvent) => {
      this.logger.info(`Message: ${JSON.stringify(event)}`);

      const records = this.parseRecords(event);

      await this.setAsyncContexts(records);

      return handler(records);
    };
  }

  private parseRecords(event: SQSEvent): MessageRecord[] {
    return event.Records.map((record) => ({
      ...record,
      body: JSON.parse(record.body),
    }));
  }

  private async setAsyncContexts(records: MessageRecord[]) {
    const { context, sysTokenContext } = records[0].body;

    context && (context.token = undefined);

    AsyncContext.set(DOORMAN_CONSTANTS.ASYNCCONTEXT.REQUEST, context);

    AsyncContext.set(
      DOORMAN_CONSTANTS.ASYNCCONTEXT.SYS_TOKEN,
      await this.sysTokenMiddleware.getSysToken(sysTokenContext)
    );
  }
}
