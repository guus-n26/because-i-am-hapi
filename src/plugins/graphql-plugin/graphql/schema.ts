import { makeExecutableSchema } from "apollo-server-hapi";

const schema = makeExecutableSchema({
  typeDefs: require("./schema.graphql"),
  resolvers: {
    Query: {
      name: (source, variables, context, document) => {
        console.log(context);
        return "Guus";
      },
      address: () => ({
        street: "test street",
      }),
    },
  },
});

export default schema;
