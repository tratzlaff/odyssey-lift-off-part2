// Our resolvers object's keys will correspond to our schema's types and fields.
const resolvers = {
    Query: {
        // This resolver function returns an array of Tracks.
        // Resolver functions have four optional parameters: parent, args, contextValue, and info.
        tracksForHome: (_, __, {dataSources}) => {

            // From our dataSources object, we'll gain access to our trackAPI
            // (lowercase here as it's the instance of our TrackAPI class extending RESTDataSource)
            return dataSources.trackAPI.getTracksForHome();

        }
    },
    Track: {
        author: ({authorId}, _, {dataSources}) => {
            // We get the needed authorId from the parent argument passed to the resolver.
            // The parent argument contains data returned by our tracksForHome resolver, and
            // because tracksForHome returns a list, Apollo Server iterates through the list
            // and calls the author resolver for each item, passing the item as the parent.
            return dataSources.trackAPI.getAuthor(authorId);
        },
    },

};

module.exports = resolvers;