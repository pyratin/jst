'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import EntityDelete from 'client/Route/User/EntityDelete';

export default async (waitFlag) => {
  cy.intercept('DELETE', '/user/*').as('_entityDelete');

  mount(
    <Wrapper>
      <EntityDelete />
    </Wrapper>
  );

  cy.get('a').click();

  waitFlag && cy.wait('@_entityDelete');
};
