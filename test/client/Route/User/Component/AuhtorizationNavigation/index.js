'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import AuthorizationNavigation from 'client/Route/User/Component/AuthorizationNavigation';

describe('AuthorizationNavigation', () => {
  it('location.pathname: /User/Authenticate :: a.Signin.active', () => {
    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.Signin').should('have.class', 'active');
  });

  it('location.pathname: /User/Create :: a.Signup.active', () => {
    history.pushState(null, null, '/User/Create');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.Signup').should('have.class', 'active');
  });

  it('a.Signin.click() :: location.pathname: /User/Authenticate', () => {
    history.pushState(null, null, '/User/Create');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.Signin').click();

    cy.location().its('pathname').should('eq', '/User/Authenticate');
  });

  it('a.Signup.click() :: location.pathname: /User/Create', () => {
    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <AuthorizationNavigation />
      </Wrapper>
    );

    cy.get('a.Signup').click();

    cy.location().its('pathname').should('eq', '/User/Create');
  });
});
