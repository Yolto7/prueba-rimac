export interface MessageBroker {
  publish<T>(topic: string, data: T): Promise<void>;
}
