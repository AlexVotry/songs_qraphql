import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route } from 'react-router-dom';

// import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* <Route path="/" component={App}> */}
          <Route exact path="/" component={SongList} />
          <Route exact path="songs/new" component={SongCreate} />
          <Route exact path="songs/:id" component={SongDetail} />
        {/* </Route> */}
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
