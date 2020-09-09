import "reflect-metadata";
import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { createConnection } from "typeorm";
import path from "path";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/user";
import { formatError } from "./utils/formatError";

const main = async () => {
  const app = new Koa();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
    formatError,
  });
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "mole",
    logging: true,
    synchronize: true,
    entities: [User],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  const PORT = 4000;

  apolloServer.applyMiddleware({ app });
  // app.use(apolloServer.getMiddleware()); <== alternative way

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => console.error(err));
