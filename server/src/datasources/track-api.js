const { RESTDataSource } = require("@apollo/datasource-rest"); // Gives us a RESTDataSource class that we can extend.

class TrackAPI extends RESTDataSource {

    // This property is used as the prefix to all the calls.
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getTracksForHome() {
        // See https://www.apollographql.com/docs/apollo-server/data/fetching-rest/#http-methods
        return this.get('tracks');
    }

    getAuthor(authorId) {
        // See https://www.apollographql.com/docs/apollo-server/data/fetching-rest/#http-methods
        // Note the use of backticks (`), because we're using string interpolation to add the authorId at the end.
        return this.get(`author/${authorId}`);
    }
}

module.exports = TrackAPI;