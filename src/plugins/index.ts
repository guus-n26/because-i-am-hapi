import { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import graphqlPlugin from './graphql-plugin';
import staticFilePlugin from './static-file-plugin';
import mainPagePlugin from './main-page-plugin';
import hapiAlivePlugin from './hapi-alive-plugin';
// import hapiPinoPlugin from "./hapi-pino-plugin";
// import loginPagePlugin from './login-page-plugin';

async function registerPlugins(server: Server, options: any = {}) {
  await graphqlPlugin(server, options);
  await server.register([
    hapiAlivePlugin,
    // hapiPinoPlugin,
    // { plugin: loginPagePlugin },
    { plugin: staticFilePlugin },
    { plugin: mainPagePlugin },
    { plugin: Inert },
  ]);
}

export default registerPlugins;
