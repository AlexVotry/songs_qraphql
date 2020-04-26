import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link, useHistory } from "react-router-dom";
import query from "../queries/fetchSongs";
import SongList from "./SongList";

const SongCreate = () => {
  const { loading, error, data } = useQuery(query);
  const [addSongMutation] = useMutation(ADD_SONG);
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  let history = useHistory();

  console.log('songs:', data);

  const onSubmit = (e) => {
    e.preventDefault();
    addSongMutation({
      variables: { title },
      refetchQueries: [{ query }],
    });
    history.push('/');
  };

  const formUpdate = (val) => {
    setTitle(val);
    setSubmitted(false);
  }

  return (
    <>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input
          onChange={e => formUpdate(e.target.value)}
          value={title}
        />
      </form>
    </>
  )
}

export const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default SongCreate;