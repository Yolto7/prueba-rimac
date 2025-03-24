import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

import { DomainEvent } from '../../../domain/events/domainEvent';
import { EventBus } from '../../../domain/events/eventBus';
import { Logger } from '../../../domain/logger';

interface Config {
  AWS_EVENT_BUS_NAME: string;
}

export class EventBridgeEventBus implements EventBus {
  private readonly client;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger
  ) {
    this.client = new EventBridgeClient();
    this.logger.info(`EventBridge client created`);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    await Promise.all(
      events.map((event) =>
        this.client.send(
          new PutEventsCommand({
            Entries: [
              {
                Source: event.eventName,
                DetailType: event.entity,
                Detail: JSON.stringify(event),
                EventBusName: this.config.AWS_EVENT_BUS_NAME,
              },
            ],
          })
        )
      )
    );

    this.logger.info(`events published: ${JSON.stringify(events)}`);
  }
}
