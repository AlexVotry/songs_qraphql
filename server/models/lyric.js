const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: { type: Schema.ObjectId, ref: 'song' },
  likes: { type: Number, default: 0 },
  content: String
});

// add a function to the schema:
LyricSchema.statics.like = async (id) => {
  const Lyric = mongoos.model('lyric');
  const lyric = await Lyric.findById(id)
  ++lyric.likes;

  return lyric.save();
}

mongoose.model('lyric', LyricSchema);