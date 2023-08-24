import { Response } from 'express';

export const SUCCESS: any = {
  OBTAINED: 'API_PEOPLE_OBTAINED',
  CREATED: 'API_PEOPLE_CREATED',
};

export const MESSAGES: any = {
  API_PEOPLE_OBTAINED: 'People data obtained successfully',
  API_PEOPLE_CREATED: 'People data created successfully',
};

export function AppSuccess(res: Response, code: string, data: any) {
  res.status(200).json({
    success: true,
    code,
    message: MESSAGES[code],
    data,
  });
}
