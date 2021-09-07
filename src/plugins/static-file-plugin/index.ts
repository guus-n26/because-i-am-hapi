import { Plugin } from '@hapi/hapi';

const staticFilePlugin: Plugin<any> = {
  name: 'static-file-plugin',
  version: '1.0.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/public/{file}',
      handler: (req, h) => h.file(`${__dirname}./../../build/${req.params.file}`),
    });
  },
};

export default staticFilePlugin;
