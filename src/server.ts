import 'graphql-import-node';
import path from 'path';
import { Server } from '@hapi/hapi';

import Joi from 'joi';
import registerPlugins from './plugins';
// import { serverAuthSchema } from './authentication';
import ConfigurationService from './services/config-service';

type ServerOptions = { port: string };

const validator = Joi.object<ServerOptions>({
  port: Joi.string().required(),
});

const log = console;

/**
 * Create a Hapi server instance.
 *
 * @param options Server options.
 */
export async function createServer({ port }: { port: string }): Promise<Server> {
  const server = new Server({
    port,
    host: '0.0.0.0',
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'build'),
      },
    },
  });

  // server.auth.scheme('auth', serverAuthSchema());
  // server.auth.strategy('auth', 'auth');
  // server.auth.default('auth');

  await registerPlugins(server);

  return server;
}

async function main() {
  const configServers = new ConfigurationService<ServerOptions>(validator);
  const port = process.env.PORT || '3000';
  const options = await configServers.withStaticConfig({ port }).withEnvironment().validate();

  const server = await createServer(options);

  await server.start();
  log.info(`Hapi server started at http://localhost:${options.port}`);
}

export function start() {
  main().catch((err: Error) => {
    log.error(err.toString());
    process.exit(1);
  });
}

if (require.main === module) {
  start();
}
