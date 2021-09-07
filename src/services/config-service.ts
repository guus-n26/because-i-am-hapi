import Joi from 'joi';

const defaultOptions: Joi.ValidationOptions = {
  stripUnknown: true,
};

class ConfigurationService<Config> {
  private options: Joi.ValidationOptions;

  private config: Config;

  private validator: Joi.ObjectSchema<any>;

  constructor(validator: Joi.ObjectSchema, options?: Joi.ValidationOptions) {
    this.validator = validator;
    this.options = options || defaultOptions;
    this.config = {} as Config;
  }

  public withStaticConfig(config: unknown): ConfigurationService<Config> {
    if (typeof config === 'object' && !Array.isArray(config)) {
      this.config = {
        ...this.config,
        ...config,
      };
      return this;
    }

    if (config === null) {
      return this;
    }

    throw Error('Config can only be of type object');
  }

  public withEnvironment(): ConfigurationService<Config> {
    this.config = {
      ...this.config,
      ...process.env,
    };
    return this;
  }

  public validate(): Config {
    return this.validator.validateAsync(
      this.config,
      this.options,
    ) as any as Config;
  }
}

export default ConfigurationService;
