'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import EntityAuthenticate from 'client/Route/User/EntityAuthenticate';

describe('EntityAuthenticate', () => {
  it('@entityAuthenticate: !complete :: [type=submit] > .LoadingInline', () => {
    cy.intercept('POST', '/user/authenticate', {
      statusCode: 200,
      body: {},
      delay: 100
    }).as('entityAuthenticate');

    const input = {
      email: '{backspace}',
      password: '{backspace}'
    };

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.get('[data-key="email"]').type(input.email);

    cy.get('[data-key="password"]').type(input.password);

    cy.get('[type=submit]').click();

    cy.get('[type=submit]').should('have.descendants', '.LoadingInline');

    cy.wait('@entityAuthenticate');
  });

  it('@entityAuthenticate: complete :: [type=submit] !> .LoadingInline', () => {
    cy.intercept('POST', '/user/authenticate', {
      statusCode: 200,
      body: {}
    }).as('entityAuthenticate');

    const input = {
      email: '{backspace}',
      password: '{backspace}'
    };

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.get('[data-key="email"]').type(input.email);

    cy.get('[data-key="password"]').type(input.password);

    cy.get('[type=submit]').click();

    cy.wait('@entityAuthenticate');

    cy.get('[type=submit]').should('not.have.descendants', '.LoadingInline');
  });

  it('@entityAuthenticate: error :: [data-key="..."].is-invalid', () => {
    const error = {
      _error: [
        {
          source: 'email',
          message: 'EMAIL-ERROR'
        },
        {
          source: 'password',
          message: 'PASSWORD-ERROR'
        }
      ],
      status: 400
    };

    cy.intercept('POST', '/user/authenticate', {
      statusCode: error.status,
      body: error
    }).as('entityAuthenticate');

    const input = {
      email: '{backspace}',
      password: '{backspace}'
    };

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.get('[data-key="email"]').type(input.email);

    cy.get('[data-key="password"]').type(input.password);

    cy.get('[type=submit]').click();

    cy.wait('@entityAuthenticate');

    cy.get('[data-key="email"]').should('have.class', 'is-invalid');

    cy.get('[data-key-error="email"]').should(
      'have.text',
      error._error[0].message
    );

    cy.get('[data-key="password"]').should('have.class', 'is-invalid');

    cy.get('[data-key-error="password"]').should(
      'have.text',
      error._error[1].message
    );
  });

  it('@entityAuthenticate: success :: location.pathname: /', () => {
    cy.intercept('POST', '/user/authenticate', {
      statusCode: 200,
      body: {}
    }).as('entityAuthenticate');

    const input = {
      email: '{backspace}',
      password: '{backspace}'
    };

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.get('[data-key="email"]').type(input.email);

    cy.get('[data-key="password"]').type(input.password);

    cy.get('[type=submit]').click();

    cy.wait('@entityAuthenticate');

    cy.location().its('pathname').should('eq', '/');
  });
});
