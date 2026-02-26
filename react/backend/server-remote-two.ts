import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";

const app = express();

app.use(cors());

/*
Second Remote GraphQL Schema
Use unique field names to avoid conflicts with Remote Schema 1.
*/
const schema = buildSchema(`
  type Query {
    remoteTwoHello: String
    remoteTwoTime: String
    remoteTwoTips: [String!]!
  }
`);

/*
Resolvers
*/
const root = {
  remoteTwoHello: () => {
    return "Hello from Remote Schema 2";
  },

  remoteTwoTime: () => {
    return new Date().toString();
  },

  remoteTwoTips: () => {
    return [
      "Remote schemas let Hasura combine multiple GraphQL services",
      "Frontend still calls one Hasura GraphQL endpoint",
      "Keep field names unique across remotes to avoid conflicts",
    ];
  },
};

/*
GraphQL Endpoint
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

/*
Start Server
*/
app.listen(5000, () => {
  console.log("Remote Schema 2 running on port 5000");
});

