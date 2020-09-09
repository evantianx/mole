import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { createConnection } from "typeorm";
import path from "path";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/user";
import { formatError } from "./utils/formatError";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
  const app = express();
  const redis = new Redis();
  const redisStore = connectRedis(session);
  const PORT = 4000;
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
    context: ({ res, req }) => ({
      res,
      req,
      redis,
    }),
    formatError,
  });

  // for redis session
  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true, // cookie only works in https
        secure: __prod__,
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: "test4mole",
      resave: false,
    })
  );
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

  apolloServer.applyMiddleware({ app });
  // app.use(apolloServer.getMiddleware()); <== alternative way

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => console.error(err));
