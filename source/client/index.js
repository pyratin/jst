'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap';

import 'client/style/index.scss';
import { StoreProvider } from 'client/store';
import _Route from './Route';
import User from './Route/User';
import UserAuthenticate from './Route/User/EntityAuthenticate';
import UserCreate from './Route/User/EntityCreate';
import UserDetail from './Route/User/EntityDetail';

createRoot(document.getElementById('viewer')).render(
  <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<_Route />}>
          <Route path='User' element={<User />}>
            <Route path='Authenticate' element={<UserAuthenticate />} />
            <Route path='Create' element={<UserCreate />} />
            <Route path=':id' element={<UserDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);
