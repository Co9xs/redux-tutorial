import React from "react";
import { HomeContainer as Home } from "./containers/Home";
import { Provider } from 'react-redux';
import { store } from "./store"
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;