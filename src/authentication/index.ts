import { ServerAuthScheme } from "@hapi/hapi";
import boom from "@hapi/boom";

export function serverAuthSchema(): ServerAuthScheme {
  return () => ({
    authenticate: async (req, h) => {
      if (false) {
        throw boom.unauthorized(null, "server");
      }
      return h.authenticated({
        credentials: {},
      });
    },
  });
}
