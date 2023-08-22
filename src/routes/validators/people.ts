import { AppError, ERRORS } from '../../common/error';
import { z } from 'zod';

const peopleSchema = z.object({
  name: z.string().min(3).max(100),
  height: z.number().int().min(1),
  mass: z.number().int().min(1),
  hair_color: z.string().min(3).max(50),
  skin_color: z.string().min(3).max(50),
  eye_color: z.string().min(3).max(50),
  birth_year: z.string().min(3).max(50),
  gender: z.string().min(4).max(10),
});

export function validatePeople(payload: any) {
  const response = peopleSchema.safeParse(payload);

  if (!response.success) {
    const errors = response.error?.issues.map((x) => ({
      key: x.path[0],
      message: x.message,
    }));

    throw new AppError(ERRORS.PAYLOAD_ERROR, 'Invalid payload supplied', errors);
  }
}
