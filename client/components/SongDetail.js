import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import getSong from "../queries/getOneSong";
import { Link, useParams } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(getSong, {
    variables: { id }
  });
  if (loading) return null;
  const { song } = data;
  console.log('song:', song);

  return (
    <>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      {/* <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={id} /> */}
    </>
  );
}

export default SongDetail;

// export default graphql(getSong, {
//   options: (props) => {
//     return { variables: { id: props.params.id } };
//   },
// })(SongDetail);
