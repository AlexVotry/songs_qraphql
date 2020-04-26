import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";


const LyricCreate = (props) => {
  const [content, setContent] = useState('');

  const onSubmit =  async (e) => {
    e.preventDefault;
    const variables = {
      content,
      songId: props.songId
    };
    await props.mutate({ variables });
    setContent('');
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </form>
  );
};

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);