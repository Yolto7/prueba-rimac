import { ScheduledEvent } from 'aws-lambda';

import { DOORMAN_CONSTANTS } from '../../domain/constants';
import { Logger } from '../../domain/logger';
import { AsyncContext, RequestAsyncContext, SysTokenAsyncContext } from '../context';
import { SysTokenMiddleware } from './sysToken.middleware';

export interface EventDetailContexts {
  context?: RequestAsyncContext;
  sysTokenContext?: SysTokenAsyncContext;
}

type Handler = (event: any) => Promise<void>;

export class EventMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly sysTokenMiddleware: SysTokenMiddleware
  ) {}

  use(handler: Handler) {
    return async (event: ScheduledEvent) => {
      this.logger.info(`Event: ${JSON.stringify(event)}`);

      await this.setAsyncContexts(event.detail);

      return handler(event.detail);
    };
  }

  private async setAsyncContexts({ context, sysTokenContext }: any) {
    context && (context.token = undefined);

    AsyncContext.set(DOORMAN_CONSTANTS.ASYNCCONTEXT.REQUEST, context);

    AsyncContext.set(
      DOORMAN_CONSTANTS.ASYNCCONTEXT.SYS_TOKEN,
      await this.sysTokenMiddleware.getSysToken(sysTokenContext)
    );
  }
}
