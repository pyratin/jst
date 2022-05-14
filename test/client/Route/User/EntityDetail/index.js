'use strict';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { mount } from '@cypress/react';

import entityCreate from 'test/client/Route/User/fn/entityCreate';
import entityDelete from 'test/client/Route/User/fn/entityDelete';
import Wrapper from 'test/client/Component/Wrapper';
import EntityDetail from 'client/Route/User/EntityDetail';

describe('EntityDetail', () => {
  const entity01 = {
    email: 'user01@test.com',
    password: 'user01Test'
  };

  before(() => {
    return entityCreate(entity01, true);
  });

  after(() => {
    return entityDelete(true);
  });

  it('PLACEHOLDER', () => {
    history.pushState(
      null,
      null,
      `/User/${window['store'].user.authorization.id}`
    );

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />}></Route>
        </Routes>
      </Wrapper>
    );

    cy.get('.header > .email').should('have.text', entity01.email);
  });
});
