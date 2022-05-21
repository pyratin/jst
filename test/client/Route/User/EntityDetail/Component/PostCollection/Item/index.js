'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Shared/Wrapper';
import Item from 'client/Route/User/EntityDetail/Component/PostCollection/Item';

describe('Item', () => {
  it('props.actionType: null :: .Item > .EntityDisplay', () => {
    const actionType = null;

    const userAuthorization = false;

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Item
          actionType={actionType}
          userAuthorization={userAuthorization}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Item').should('have.descendants', '.EntityDisplay');
  });

  it('props.actionType: entityUpdate :: .Item > .EntityUpdate', () => {
    const actionType = 'entityUpdate';

    const userAuthorization = false;

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Item
          actionType={actionType}
          userAuthorization={userAuthorization}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Item').should('have.descendants', '.EntityUpdate');
  });

  it('props.actionType: entityDelete :: .Item > .EntityDelete', () => {
    const actionType = 'entityDelete';

    const userAuthorization = false;

    const entity = { text: 'TEXT' };

    const user = { email: 'EMAIL' };

    mount(
      <Wrapper>
        <Item
          actionType={actionType}
          userAuthorization={userAuthorization}
          entity={entity}
          user={user}
        />
      </Wrapper>
    );

    cy.get('.Item').should('have.descendants', '.EntityDelete');
  });
});
