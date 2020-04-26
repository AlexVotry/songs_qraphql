const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  user: { type: Schema.ObjectId, ref: "User" },
  lyrics: [{ type: Schema.ObjectId, ref: 'lyric' }]
});

SongSchema.statics.addLyric = async (id, content) => {
  const Lyric = mongoose.model('lyric');
  const song = await this.findById(id);
  const lyric = new Lyric({ content, song })

  song.lyrics.push(lyric);

  return Promise.all([lyric.save(), song.save()])
    .then(([lyric, song]) => song);
};

SongSchema.statics.findLyrics =  async function (id) {
  const song = this.findById(id).populate('lyrics');
  
  return song.lyrics;
}

mongoose.model('song', SongSchema);