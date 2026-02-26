import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store";
import { ApolloProvider } from '@apollo/client/react';
import client from './hasuralearning/remote_schema/apolloClient';

const container = document.getElementById("root");

if (!container) { 
throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
