import { AttributeValue } from '@aws-sdk/client-dynamodb';

import { QueryPage } from '../../../domain/criteria/pagination';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT } from '../../../domain/constants';

export interface DynamoPagination {
  ExclusiveStartKey?: Record<string, AttributeValue> | undefined;
  Limit: number;
}

export function dynamoPaginationResolver(input: QueryPage): DynamoPagination {
  return {
    ExclusiveStartKey: input.nextToken
      ? JSON.parse(Buffer.from(input.nextToken, 'base64').toString('utf-8'))
      : undefined,
    Limit: Math.min(Number(input.take) || PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT),
  };
}

export function dynamoNextTokenResolver(nextToken?: unknown): string | undefined {
  return nextToken ? Buffer.from(JSON.stringify(nextToken)).toString('base64') : undefined;
}
