import { Response } from 'express';
import logger from './logger';

export const SUCCESS: any = {
  OBTAINED: 'People data obtained successfully',
  CREATED: 'People data created successfully',
};

export function AppSuccess(res: Response, code: string, data: any) {
  logger.info(`code: ${code}, message: ${SUCCESS[code]}`);
  res.status(200).json({
    success: true,
    code,
    message: SUCCESS[code],
    data,
  });
}
