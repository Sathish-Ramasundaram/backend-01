
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();

app.use(cors());

// GraphQL Schema
const schema = buildSchema(`
  type Query {
    hello: String
    getServerTime: String
  }
`);

// Resolver functions
const root = {

  hello: () => {
    return "Hello from Remote Schema";
  },

  getServerTime: () => {
    return new Date().toString();
  }

};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Remote Schema running on port 4000");
});

