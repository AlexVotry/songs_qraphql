import React from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import query from "../queries/fetchSongs";

const SongList = () => {
  const { loading, error, data } = useQuery(query);
  const [deleteSongMutation] = useMutation(DELETE_SONG);

  const renderSongTitles = () => {
    return data.songs.map(({ id, title }) => 
    <li className="collection-item" key={id}>
      <Link to={`songs/${id}`} >
        {title}
      </Link>
      <i className="material-icons right" style={{ cursor: "pointer" }} onClick={() => onSongDelete(id)}>
      delete
      </i>
    </li>)
  }

  const onSongDelete = (id) => {
    deleteSongMutation({
      variables: { id },
      update: (cache) => {
          const existingSongs = data.songs;
          const remainingSongs = existingSongs.filter(s => (s.id !== id));
          cache.writeQuery({
            query,
            data: { songs: remainingSongs}
          })
        }
    });
  };

  if (loading) return <div>Loading ...</div>
  if (error) return 'Error!'; 

  return (
    <>
    <h3>Song List</h3>
      <ul className="collection">
        {renderSongTitles()}
      </ul>
      <Link
        to="songs/new"
        className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
      </Link>
    </>
  );
};

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default SongList;