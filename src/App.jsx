import React from 'react';
// $FlowFixMe
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import { Header, Resize } from 'components';
import { Container } from 'reactstrap';
// $FlowFixMe
import { StateProvider } from 'state';
import stateReducer from 'reducers';
import Navigator from 'pages';
import './App.sass';

const initialState = { isMobile };

export default () => {
  return (
    <StateProvider initialState={initialState} reducer={stateReducer}>
      <Container fluid>
        <Header/>
        <BrowserRouter>
          <Navigator/>
        </BrowserRouter>
        <Resize/>
      </Container>
    </StateProvider>
  );
};
