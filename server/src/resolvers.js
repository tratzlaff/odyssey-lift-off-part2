// Our resolvers object's keys will correspond to our schema's types and fields.
const resolvers = {
    Query: {
        // This resolver function returns an array of Tracks.
        // Resolver functions have four optional parameters: parent, args, contextValue, and info.
        tracksForHome: (parent, args, contextValue, info) => {

        },
    }
};

module.exports = resolvers;