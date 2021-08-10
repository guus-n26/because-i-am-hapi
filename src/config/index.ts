import Joi from "joi";

const options: Joi.ValidationOptions = {
  stripUnknown: true,
};

export function validateServerConfig(config: any) {
  const validator = Joi.object({
    port: Joi.string().required(),
  });

  return validator.validateAsync(config, options);
}
