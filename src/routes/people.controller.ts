import { Request, Response } from 'express';

import { AppSuccess, SUCCESS } from '../common/success';
import { validatePeople } from './validators/people';
import PeopleService from '../services/people.service';
import { createController } from 'awilix-express';

class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  async getAllBySwapi(_req: Request, res: Response) {
    const result = await this.peopleService.getAllBySwapi();
    AppSuccess(res, SUCCESS.OBTAINED, result);
  }
  async getAll(_req: Request, res: Response) {
    const result = await this.peopleService.getAll();
    AppSuccess(res, SUCCESS.OBTAINED, result);
  }

  async create(req: Request, res: Response) {
    validatePeople(req.body);
    const result = await this.peopleService.create(req.body);
    AppSuccess(res, SUCCESS.CREATED, result);
  }
}

export default createController(PeopleController)
  .prefix('/people')

  .get('/swapi', 'getAllBySwapi')
  .get('/', 'getAll')
  .post('/', 'create');
