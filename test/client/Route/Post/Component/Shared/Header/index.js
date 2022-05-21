'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Shared/Wrapper';
import Header from 'client/Route/Post/Component/Shared/Header';

describe('Header', () => {
  it('props: { actionType: null, userAuthorization: true } :: .Header > .Control', () => {
    const userAuthorization = true;

    const actionType = null;

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Header
          userAuthorization={userAuthorization}
          actionType={actionType}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Header').should('have.descendants', '.Control');
  });

  it('props: { actionType: null, userAuthorization: false } :: .Header !> .Control', () => {
    const userAuthorization = false;

    const actionType = null;

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Header
          userAuthorization={userAuthorization}
          actionType={actionType}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Header').should('not.have.descendants', '.Control');
  });

  it('props: { actionType: entityUpdate, userAuthorization: true } :: .Header !> .Control', () => {
    const userAuthorization = true;

    const actionType = 'entityUpdate';

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Header
          userAuthorization={userAuthorization}
          actionType={actionType}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Header').should('not.have.descendants', '.Control');
  });
});
