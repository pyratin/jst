'use strict';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from 'client/store';
import 'client/style/index.scss';

const Wrapper = ({ children }) => {
  return (
    <div id='Wrapper'>
      <StoreProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </StoreProvider>
    </div>
  );
};

export default Wrapper;
