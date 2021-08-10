import { Server, ServerRegisterPluginObject } from "@hapi/hapi";
import Inert from "@hapi/inert";
import backendApi from "./management-endpoint-plugin";
import graphqlPlugin from "./graphql-plugin";
import staticFilePlugin from "./static-file-plugin";
import serverSideRenderPlugin from "./main-page-plugin";

const hapiPino: ServerRegisterPluginObject<any> = {
  plugin: require("hapi-pino"),
  options: {
    prettyPrint: process.env.NODE_ENV !== "production",
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ["req.headers.authorization"],
  },
};

async function registerPlugins(server: Server, options: any = {}) {
  await graphqlPlugin(server, options);
  await server.register([
    hapiPino,
    { plugin: staticFilePlugin },
    { plugin: backendApi },
    { plugin: serverSideRenderPlugin },
  ]);
  await server.register(Inert);
}

export default registerPlugins;
