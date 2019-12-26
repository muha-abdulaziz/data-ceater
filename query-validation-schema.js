const Joi = require('@hapi/joi');

const selectedItemsSchema = Joi.string()
  .min(1)
  .max(50);

const selectSchema = Joi.array().items(selectedItemsSchema);

const whereSchema = Joi.object().keys({});

const fullQuerySchema = Joi.object().keys({
  select: selectSchema.required(),
  where: whereSchema,
});

const querySchema = Joi.alternatives([
  selectSchema.required(),
  fullQuerySchema,
]);

module.exports = querySchema;
