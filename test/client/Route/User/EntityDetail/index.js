'use strict';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Shared/Wrapper';
import EntityDetail from 'client/Route/User/EntityDetail';

describe('EntityDetail', () => {
  it('@entityGet: !complete :: .EntityDetail > .Loading', () => {
    const entity = {
      id: '51db483b-ea2f-47a2-a797-49e1d773606e',
      email: 'EMAIL'
    };

    const error = {
      _error: [
        {
          source: 'ERROR-SOURCE',
          message: 'ERROR-MESSAGE'
        }
      ],
      status: 400
    };

    cy.intercept('GET', `/user/${entity.id}`, {
      statusCode: error.status,
      body: error,
      delay: 100
    }).as('entityGet');

    history.pushState(null, null, `/User/${entity.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />}></Route>
        </Routes>
      </Wrapper>
    );

    cy.get('.EntityDetail').should('have.descendants', '.Loading');

    cy.wait('@entityGet');
  });

  it('@entityGet: complete :: .EntityDetail !> .Loading', () => {
    const entity = {
      id: '51db483b-ea2f-47a2-a797-49e1d773606e',
      email: 'EMAIL'
    };

    const error = {
      _error: [
        {
          source: 'ERROR-SOURCE',
          message: 'ERROR-MESSAGE'
        }
      ],
      status: 400
    };

    cy.intercept('GET', `/user/${entity.id}`, {
      statusCode: error.status,
      body: error
    }).as('entityGet');

    history.pushState(null, null, `/User/${entity.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />} />
        </Routes>
      </Wrapper>
    );

    cy.wait('@entityGet');

    cy.get('.EntityDetail').should('not.have.descendants', '.Loading');
  });

  it('@entityGet: error :: .EntityDetail > .Error', () => {
    const entity = {
      id: '51db483b-ea2f-47a2-a797-49e1d773606e',
      email: 'EMAIL'
    };

    const error = {
      _error: [
        {
          source: 'ERROR-SOURCE',
          message: 'ERROR-MESSAGE'
        }
      ],
      status: 400
    };

    cy.intercept('GET', `/user/${entity.id}`, {
      statusCode: error.status,
      body: error
    }).as('entityGet');

    history.pushState(null, null, `/User/${entity.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />} />
        </Routes>
      </Wrapper>
    );

    cy.wait('@entityGet');

    cy.get('.EntityDetail').should('have.descendants', '.Error');

    cy.get('.Error').should('contain', error._error[0].source);

    cy.get('.Error').should('contain', error._error[0].message);
  });

  it('@entityGet: success :: .Entity > .success', () => {
    const entity = {
      id: '51db483b-ea2f-47a2-a797-49e1d773606e',
      email: 'EMAIL'
    };

    cy.intercept('GET', `/user/${entity.id}`, {
      statusCode: 200,
      body: entity
    }).as('entityGet');

    cy.intercept('GET', `/user/${entity.id}/post?**`, {
      statusCode: 200,
      body: {
        collection: [],
        info: {
          userId: entity.id,
          hasMore: false
        }
      }
    }).as('entityPostCollectionGet');

    history.pushState(null, null, `/User/${entity.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />} />
        </Routes>
      </Wrapper>
    );

    cy.wait('@entityGet');

    cy.wait('@entityPostCollectionGet');

    cy.get('.EntityDetail').should('have.descendants', '.success');

    cy.get('.success .Header').should('contain', entity.email);
  });
});
