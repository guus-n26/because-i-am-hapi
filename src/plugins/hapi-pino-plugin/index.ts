import { ServerRegisterPluginObject } from '@hapi/hapi';

const hapiPinoPlugin: ServerRegisterPluginObject<any> = {
  plugin: require('hapi-pino'),
  options: {
    prettyPrint: process.env.NODE_ENV !== 'production',
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ['req.headers.authorization'],
  },
};

export default hapiPinoPlugin;
