import { APIGatewayProxyEvent } from 'aws-lambda';

import { AppSuccess } from '@rimac/shared';

import PeopleQueriesService from '../../../application/services/queries/people.query.service';

export default class PeoplePublicController {
  constructor(private readonly peopleQueriesService: PeopleQueriesService) {}

  async getSwapiAll(_event: APIGatewayProxyEvent) {
    return AppSuccess.status(200).json({
      message: 'People swapi obtained successfully',
      data: await this.peopleQueriesService.getSwapiAll(),
    });
  }
}
