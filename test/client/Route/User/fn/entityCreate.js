'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import EntityCreate from 'client/Route/User/EntityCreate';

export default (input, waitFlag) => {
  cy.intercept('POST', '/user').as('_entityCreate');

  mount(
    <Wrapper>
      <EntityCreate />
    </Wrapper>
  );

  cy.get('[data-key="email"]').type(input.email);

  cy.get('[data-key="password"]').type(input.password);

  cy.get('[type=submit]').click();

  waitFlag && cy.wait('@_entityCreate');
};
