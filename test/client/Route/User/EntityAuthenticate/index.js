'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import EntityAuthenticate from 'client/Route/User/EntityAuthenticate';
import 'cypress-react-app-actions';

describe.only('EntityAuthenticate', () => {
  it('POST /user/authenticate: error :: AuthorizationForm.props.error', () => {
    const error = {
      _error: [
        {
          source: 'email',
          message: 'ERROR'
        }
      ],
      status: 400
    };

    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.intercept('POST', '/user/authenticate', {
      statusCode: error.status,
      body: error
    }).as('entityAuthenticate');

    cy.get('button[type=submit]').click();

    cy.wait('@entityAuthenticate');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    /** @type {any} */ (cy)
      .get('.AuthorizationForm')
      .getComponent()
      .its('props.error')
      .should('deep.equal', error);
  });

  it('POST /user/authenticate : success :: location.pathname: /', () => {
    const result = {
      id: 'x'
    };

    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.intercept('POST', '/user/authenticate', {
      statusCode: 200,
      body: result
    }).as('entityAuthenticate');

    cy.get('button[type=submit]').click();

    cy.wait('@entityAuthenticate');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    cy.location().its('pathname').should('eq', '/');

    cy.wrap(window)
      .its('store.user.authorization')
      .should('deep.equal', result);
  });

  it.only('POST /user/authenticate :: AuthorizationForm.props.loading', () => {
    const error = {
      _error: [
        {
          source: 'email',
          message: 'ERROR'
        }
      ],
      status: 400
    };

    history.pushState(null, null, '/User/Authenticate');

    mount(
      <Wrapper>
        <EntityAuthenticate />
      </Wrapper>
    );

    cy.intercept('POST', '/user/authenticate', (request) => {
      request.reply({
        statusCode: error.status,
        body: error,
        delay: 0,
        throttleKbps: .01
      });
    }).as('entityAuthenticate');

    cy.get('button[type=submit]').click();

    /** @type {any} */ (cy).get('.AuthorizationForm')
      .getComponent()
      .its('props.loading')
      .then((result) => {
        console.log('getComponent', result);
      });

    cy.wait('@entityAuthenticate');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    /** @type {any} */ (cy)
      .get('.AuthorizationForm')
      .getComponent()
      .its('props.error')
      .should('deep.equal', error);
  });
});
