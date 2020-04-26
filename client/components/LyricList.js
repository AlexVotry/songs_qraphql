import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LyricList = ({lyrics}) => {
  console.log('props:', lyrics);
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onLike = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        LikeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };

   const renderLyrics = () =>  {
     if (!lyrics) return <h4>no lyrics</h4>
    return lyrics.map(({ id, content, likes }) => 
      <li key={id} className="collection-item">
        {content}
        <i className="material-icons right" onClick={() => onLike(id, likes)}>
          thumb_up
        </i>
        <div className="right">{likes}</div>
      </li>
    )};

    return (
      <ul className="collection">
        {renderLyrics()}
      </ul>
    )

}


const LIKE_LYRIC = gql`
  mutation LikeLyric($id: String) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default LyricList;