import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, useHistory } from "react-router-dom";
import query from "../queries/fetchSongs";

const SongCreate = (props) => {
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.mutate({
      variables: { title },
      refetchQueries: [{ query }] //apollo doesn't update list unless we manually query again.
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

export const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);