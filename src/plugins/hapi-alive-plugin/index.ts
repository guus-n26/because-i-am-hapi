import { Server } from '@hapi/hapi';

const hapiAlivePlugin = {
  plugin: require('hapi-alive'),
  options: {
    path: '/health', // Health route path
    tags: ['health', 'monitor'],
    async healthCheck(server: Server) {
      return true;
    },
  },
};

export default hapiAlivePlugin;
