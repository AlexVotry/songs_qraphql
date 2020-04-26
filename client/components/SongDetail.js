import React from "react";
import { graphql } from "react-apollo";
import getSong from "../queries/getOneSong";
import { Link } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = (props) => {
  const { song } = props.data;

  if (!song) return null;

  return (
    <>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={props.params.id} />
    </>
  );
}

export default graphql(getSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);