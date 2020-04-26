import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import query from "../queries/fetchSongs";

const SongList = (props) => {

  const renderSongTitles = () => {
    return props.data.songs.map(({ id, title }) => 
    <li className="collection-item" key={id}>
      <Link to={`/songs/${id}`} >
        {title}
      </Link>
      <i className="material-icons right" style={{ cursor: "pointer" }} onClick={() => onSongDelete(id)}>
      delete
      </i>
    </li>)
  }

  const onSongDelete = async (id) => {
    await props.mutate({ variables: id });
    props.data.refetch();
  };

  if (props.data.loading) return <div>Loading ...</div>

  return (
    <>
      <ul className="collection">
        {renderSongTitles()}
      </ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
      </Link>
    </>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));