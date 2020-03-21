import React from 'react';
import { hydrate, render } from "react-dom";
import './index.sass';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
