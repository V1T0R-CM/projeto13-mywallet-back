import joi from 'joi';

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  repeatPassword: joi.string().required()
});

export default registerSchema;