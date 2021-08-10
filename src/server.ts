import "graphql-import-node";
import path from "path";
import { Server } from "@hapi/hapi";

import registerPlugins from "./plugins";
import { serverAuthSchema } from "./authentication";
import ConfigurationService from "./services/config-service";
import Joi from "joi";

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
export async function createServer({
  port,
}: {
  port: string;
}): Promise<Server> {
  const server = new Server({
    port,
    host: "0.0.0.0",
    routes: {
      files: {
        relativeTo: path.join(__dirname, "build"),
      },
    },
  });
  server.auth.scheme("cookie", serverAuthSchema());
  server.auth.strategy("cookie", "cookie");

  await registerPlugins(server);

  return server;
}

async function main() {
  const configServers = new ConfigurationService<ServerOptions>(validator);
  const port = process.env.PORT || "5000";
  const options = await configServers
    .withStaticConfig({ port })
    .withEnvironment()
    .validate();

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
