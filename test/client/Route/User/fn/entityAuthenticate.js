'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import EntityAuthenticate from 'client/Route/User/EntityAuthenticate';

export default (input, waitFlag = false) => {
  cy.intercept('POST', '/user/authenticate').as('_entityAuthenticate');

  mount(
    <Wrapper>
      <EntityAuthenticate />
    </Wrapper>
  );

  cy.get('[data-key="email"]').type(input.email);

  cy.get('[data-key="password"]').type(input.password);

  cy.get('[type=submit]').click();

  waitFlag && cy.wait('@_entityAuthenticate');
};
