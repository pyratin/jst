'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import AuthorizationNavigation from 'client/Route/User/Component/AuthorizationNavigation';

describe('AuthorizationNavigation', () => {
  it('location.pathname: /User/Authenticate :: a.active.text(Signin)', () => {
    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.active').should('have.text', 'Signin');
  });

  it('location.pathname: /User/Create :: a.active.text(Signup)', () => {
    history.pushState(null, null, '/User/Create');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.active').should('have.text', 'Signup');
  });

  it('a.text(Signin).click() :: location.pathname: /User/Authenticate', () => {
    history.pushState(null, null, '/User/Create');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a:contains("Signin")').click();

    cy.location()
      .its('pathname')
      .should('eq', '/User/Authenticate');
  });

  it('a.text(Signup).click() :: location.pathname: /User/Create', () => {
    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a:contains("Signup")').click();

    cy.location()
      .its('pathname')
      .should('eq', '/User/Create');
  });
});
