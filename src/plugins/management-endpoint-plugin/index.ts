import { Plugin } from "@hapi/hapi";
// import Joi from "joi";
// import boom from "@hapi/boom";

// Custom validator
// const validator: RouteOptionsResponseSchema = (value, options) => {
//   throw boom.badRequest("this is not correct", value);
//   //   const stuff = async () => true;
//   //   return stuff();
// };

// const response: RouteOptionsResponse = {
//   schema: Joi.object({
//     test: Joi.string(),
//     path: Joi.string(),
//     params: Joi.any(),
//   }),
// };

const managementEndpointPlugin: Plugin<any> = {
  name: "management-endpoint-plugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/management/status",
      handler: (req, h) => {
        return "OK";
      },
    });
  },
};

export default managementEndpointPlugin;
