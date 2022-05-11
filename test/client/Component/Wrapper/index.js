'use strict';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from 'client/store';
import 'client/style/index.scss';

const Wrapper = ({ children }) => {
  return (
    <StoreProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </StoreProvider>
  );
};

export default Wrapper;
