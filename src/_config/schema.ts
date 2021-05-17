import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('local', 'development', 'staging', 'production', 'test')
    .required(),
  PORT: Joi.number().required(),

  POSTGRES_HOST: [Joi.string().ip(), Joi.string().hostname()],
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
});