import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const LyricList = (props) => {

  const onLike = (id, likes) => {
    props.mutate({
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
    return props.lyrics.map(({ id, content, likes }) => 
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


const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);