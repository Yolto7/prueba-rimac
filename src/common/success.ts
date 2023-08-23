import { Response } from 'express';

export const SUCCESS: any = {
  OBTAINED: 'People data obtained successfully',
  CREATED: 'People data created successfully',
};

export function AppSuccess(res: Response, code: string, data: any) {
  res.status(200).json({
    success: true,
    code,
    message: SUCCESS[code],
    data,
  });
}
