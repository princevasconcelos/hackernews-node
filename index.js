const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const Query = require("./src/resolvers/Query");
const Mutation = require("./src/resolvers/Mutation");
const AuthPayload = require("./src/resolvers/AuthPayload");
const Subscription = require("./src/resolvers/Subscription");
const Feed = require("./src/resolvers/Feed");

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/prince-vasconcelos-758253/database/dev",
      secret: "mysecret123",
      debug: true
    })
  })
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
