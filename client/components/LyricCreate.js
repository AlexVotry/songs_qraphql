import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";


const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState('');
  const [addLyricMutation] = useMutation(ADD_LYRICS);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLyricMutation({
      variables: { content, songId }
    });
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Lyric</label>
      <input
      type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </form>
  );
};

const ADD_LYRICS = gql`
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

export default LyricCreate;