import {
  RouteOptionsResponse,
  RouteOptionsResponseSchema,
  Plugin,
} from "@hapi/hapi";
import Joi from "joi";
import boom from "@hapi/boom";

// Custom validator
const validator: RouteOptionsResponseSchema = (value, options) => {
  throw boom.badRequest("this is not correct", value);
  //   const stuff = async () => true;
  //   return stuff();
};

const response: RouteOptionsResponse = {
  schema: Joi.object({
    test: Joi.string(),
    path: Joi.string(),
    params: Joi.any(),
  }),
};

const apiPlugin: Plugin<any> = {
  name: "api-plugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/api/users/{params*}",
      options: {
        auth: {
          strategy: "cookie",
        },
        validate: {
          params: validator,
        },
        response,
      },
      handler: (req, h) => {
        return {
          test: "foo",
          path: req.path,
          params: req.params,
        };
      },
    });
  },
};

export default apiPlugin;
