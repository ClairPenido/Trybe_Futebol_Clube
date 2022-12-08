import * as Joi from 'joi';

import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

const errorMessage = 'All fields must be filled';

export default (req: Request, res: Response, next: NextFunction) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': errorMessage,
      'any.required': errorMessage,
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': errorMessage,
      'any.required': errorMessage,
    }),
  });
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  console.log('entrou joi', error);
  if (error?.details[0].type === 'string.email') {
    throw new HttpException(401, 'Incorrect email or password');
  }
  if (error) throw new HttpException(400, error.details[0].message);
  next();
};
