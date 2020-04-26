const mongoose = require('mongoose');
const graphql = require('graphql');
const Lyric = mongoose.model('lyric');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./song_type'),
      async resolve(parentValue) {
        const lyric = await Lyric.findById(parentValue).populate('song');
        return lyric.song;
      }
    }
  })
});

module.exports = LyricType;

