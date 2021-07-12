import Path from "path";
import { Server } from "@hapi/hapi";

import registerPlugins from "./plugins";
import { serverAuthSchema } from "./authentication";

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
        relativeTo: Path.join(__dirname, "build"),
      },
    },
  });
  server.auth.scheme("cookie", serverAuthSchema());
  server.auth.strategy("cookie", "cookie");

  await registerPlugins(server);

  return server;
}

async function main() {
  const options = { port: process.env.PORT || "5000" };
  const server = await createServer(options);

  await server.start();
  log.info(`Hapi server started at http://localhost:${options.port}`);
}

export function start() {
  return main().catch((err: Error) => {
    log.error(err.toString());
    process.exit(1);
  });
}

if (require.main === module) {
  start();
}
