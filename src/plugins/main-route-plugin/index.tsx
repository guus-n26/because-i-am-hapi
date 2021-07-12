import { Plugin } from "@hapi/hapi";
import { renderToStaticMarkup } from "react-dom/server";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import React from "react";
import SsrEntry from "./ssr-entry";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";

export function Html({ content, state }: any) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`,
          }}
        />
        <script type="module" src="/public/bundle.js"></script>
      </body>
    </html>
  );
}
const mainRoutePlugin: Plugin<any> = {
  name: "ssr-plugin",
  version: "1.0.0",
  register: (server) => {
    server.route({
      method: "GET",
      path: "/public/{file}",
      handler: (req, h) =>
        h.file(__dirname + `./../../build/${req.params.file}`),
    });
    server.route({
      method: "GET",
      path: "/{param*}",
      handler: async (req, h) => {
        const client = new ApolloClient({
          ssrMode: true,
          link: new SchemaLink({ schema: (req as any).getSchema() }),
          cache: new InMemoryCache(),
        });

        const App = () => <SsrEntry client={client} />;

        const content = await renderToStringWithData(<App />);
        const initialState = client.extract();

        const html = <Html content={content} state={initialState} />;
        return `<!doctype html>\n${renderToStaticMarkup(html)}`;
      },
    });
  },
};

export default mainRoutePlugin;
