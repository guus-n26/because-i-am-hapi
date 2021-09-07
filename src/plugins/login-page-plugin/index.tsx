import { Plugin, Request, ResponseToolkit } from '@hapi/hapi';
import { GraphQLSchema } from 'graphql';

type PluginRequest = Request & { getSchema?: () => GraphQLSchema };

const loginPagePlugin: Plugin<any> = {
  name: 'login-page-plugin',
  version: '1.0.0',
  register: (server) => {
    server.route([
      {
        method: ['GET', 'POST'],
        path: '/login',
        handler,
        options: {
          auth: false,
          state: {
            parse: true,
            failAction: 'error',
          },
        },
      },
    ]);
  },
};

function handler(req: PluginRequest, h: ResponseToolkit) {
  if (req.method === 'post') {
    h.state('user', { firstVisit: false });
    return h.redirect('/');
  }
  // if not authorized, display the form
  return `
    <html>
      <head>
          <title>Login page</title>
      </head>
      <body>
          <h3>Please Log In</h3>
          <form method="post" action="/login">
              Username: <input type="text" name="username"><br>
              Password: <input type="password" name="password"><br/>
          <input type="submit" value="Login"></form>
      </body>
    </html>`;
}

export default loginPagePlugin;
