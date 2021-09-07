import { ServerAuthScheme } from '@hapi/hapi';

export function serverAuthSchema(): ServerAuthScheme {
  return (server, options) => {
    server.state('user', {
      ttl: null,
      isSecure: true,
      isHttpOnly: true,
      encoding: 'base64json',
      clearInvalid: true,
      strictHeader: true,
    });
    return {
      authenticate: async (req, h) => {
        if (req.state?.user?.firstVisit === false) {
          return h.authenticated({ credentials: { name: 'guus van ooijen' } });
        }
        return h
          .response('You are being redirected...')
          .takeover()
          .redirect('/login');
      },
    };
  };
}
