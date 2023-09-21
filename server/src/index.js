const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api"); // note the PascalCase convention, as we're dealing with the class here

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    // This object (second param of startStandaloneServer) is for configuring your server's options.

    // Define a context function that returns an object that all our resolvers will share
    context: async () => {
      // This object becomes our resolver's contextValue, the third positional argument.

      // To take advantage of the RESTDataSource's caching capabilities,
      // we need to pass in the server's cache to our TrackAPI.
      const { cache } = server;

      return {
        // We want to access the dataSources.trackAPI (and its methods) from the contextValue
        // parameter of our resolvers. So let's return an object that allows us to do just that!
        // Note: Our resolver functions expect to find dataSources.trackAPI on their contextValue,
        // which is why we've defined a property called dataSources here in our server.
        // This particular name isn't a requirement - we chose dataSources as a matter of convention.
        // You can give this property whatever name you'd like, but be sure that you update your resolver
        // functions to access the same property.
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
  });
  console.log(`
      🚀  Server is running
      📭  Query at ${url}
    `);
}

startApolloServer();
