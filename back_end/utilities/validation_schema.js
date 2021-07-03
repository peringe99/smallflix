const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().lowercase().min(4).max(30),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),
    roles: Joi.string()
      .meta({
        _mongoose: { type: 'ObjectId', ref: 'Role' },
      })
      .meta({ _mongoose: { _id: false, timestamps: true } }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
