import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";

const app = express();

app.use(cors());

/*
GraphQL Schema
*/
const schema = buildSchema(`
  type Query {
    hello: String
    getServerTime: String
  }
`);

/*
Resolvers
*/
const root = {

  hello: () => {
    return "Hello from Remote Schema";
  },

  getServerTime: () => {
    return new Date().toString();
  }

};

/*
GraphQL Endpoint
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

/*
Start Server
*/
app.listen(4000, () => {
  console.log("Remote Schema running on port 4000");
});
