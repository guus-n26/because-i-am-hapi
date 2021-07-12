import { Server, ServerRegisterPluginObject } from "@hapi/hapi";
import Inert from "@hapi/inert";
import backendApi from "./api-plugin";
import graphqlPluginFn from "./graphql-plugin";
import mainRoutePlugin from "./main-route-plugin";

const hapiPino: ServerRegisterPluginObject<any> = {
  plugin: require("hapi-pino"),
  options: {
    prettyPrint: process.env.NODE_ENV !== "production",
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ["req.headers.authorization"],
  },
};

async function registerPlugins(server: Server, options: any = {}) {
  await graphqlPluginFn(server, options);
  await server.register([
    hapiPino,
    { plugin: backendApi },
    { plugin: mainRoutePlugin },
  ]);
  await server.register(Inert);
}

export default registerPlugins;
