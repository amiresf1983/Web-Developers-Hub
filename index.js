require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/", {
//   useNewUrlParser: false,
//   useUnifiedTopology: false,
// });
// mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
//   console.log("MongoDB Connected successfully!");
//   return server.listen({ port: 5000 });
// });
// .then((res) => {
//   console.log(`Server successfully running at ${res.url}`);
// });// mongoose
// .connect(MONGODB, { useNewUrlParser: true })
// .then(() => {
//   console.log("MongoDB Connected successfully!");
//   return server.listen({ port: 5000 });
// })
// .then((res) => {
//   console.log(`Server successfully running at ${res.url}`);
// });

// mongoose
// .connect(MONGODB, { useNewUrlParser: true })
// .then(() => {
//   console.log("MongoDB Connected successfully!");
//   return server.listen({ port: 5000 });
// })
// .then((res) => {
//   console.log(`Server successfully running at ${res.url}`);
// });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
