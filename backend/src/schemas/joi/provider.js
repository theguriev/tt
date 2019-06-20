import Joi from '@hapi/joi';

export default {
  body: {
    name: Joi.string().min(3).max(100).required()
  }
};