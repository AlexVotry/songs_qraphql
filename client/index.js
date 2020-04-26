import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const cache = new InMemoryCache({
  dataIdFromObject: (o) => o.id
});

const client = new ApolloClient({
  link: new HttpLink(),
  cache
});

const About = () => <h1>About Us</h1>

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={SongList} />
          <Route path = "/about" component={About} />
          <Route exact path="/songs/new" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail} />
      </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
