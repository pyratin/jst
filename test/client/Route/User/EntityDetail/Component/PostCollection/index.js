'use strict';

import React from 'react';
import { mount } from '@cypress/react';
import { Route, Routes } from 'react-router-dom';

import Wrapper from 'test/client/Component/Wrapper';
import PostCollection from 'client/Route/User/EntityDetail/Component/PostCollection';
import EntityDetail from 'client/Route/User/EntityDetail';

describe('PostCollection', () => {
  it('@entityPostCollectionGet: !complete :: .PostCollection > .LoadingInline', () => {
    const user = {
      id: '420689f6-10e2-4714-a988-bc8ff630b628',
      post: {
        collection: {
          dictionary: {},
          info: {}
        }
      }
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

    cy.intercept('GET', `/user/${user.id}/post?**`, {
      statusCode: error.status,
      body: error,
      delay: 100
    }).as('entityPostCollectionGet');

    mount(
      <Wrapper>
        <PostCollection user={user} />
      </Wrapper>
    );

    cy.get('.PostCollection').should('have.descendants', '.loader');

    cy.wait('@entityPostCollectionGet');
  });

  it('@entityPostCollectionGet: complete :: .PostCollection !> .LoadingInline', () => {
    const user = {
      id: '420689f6-10e2-4714-a988-bc8ff630b628',
      post: {
        collection: {
          dictionary: {},
          info: {}
        }
      }
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

    cy.intercept('GET', `/user/${user.id}/post?**`, {
      statusCode: error.status,
      body: error
    }).as('entityPostCollectionGet');

    mount(
      <Wrapper>
        <PostCollection user={user} />
      </Wrapper>
    );

    cy.wait('@entityPostCollectionGet');

    cy.get('.PostCollection').should('not.have.descendants', '.LoadingInline');
  });

  it('@entityPostCollectionGet: error :: .PostCollection > .Error', () => {
    const user = {
      id: '420689f6-10e2-4714-a988-bc8ff630b628',
      post: {
        collection: {
          dictionary: {},
          info: {}
        }
      }
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

    cy.intercept('GET', `/user/${user.id}/post?**`, {
      statusCode: error.status,
      body: error
    }).as('entityPostCollectionGet');

    mount(
      <Wrapper>
        <PostCollection user={user} />
      </Wrapper>
    );

    cy.wait('@entityPostCollectionGet');

    cy.get('.PostCollection').should('have.descendants', '.Error');
  });

  it('@entityPostCollectionGet: success: []  :: .PostCollection > .CollectionEmpty', () => {
    const user = {
      id: '420689f6-10e2-4714-a988-bc8ff630b628',
      email: 'EMAIL'
    };

    cy.intercept('GET', `/user/${user.id}`, {
      statusCode: 200,
      body: user
    }).as('entityGet');

    cy.intercept('GET', `/user/${user.id}/post?**`, {
      statusCode: 200,
      body: {
        collection: [],
        info: {
          userId: user.id,
          hasMore: false
        }
      }
    }).as('entityPostCollectionGet');

    history.pushState(null, null, `/User/${user.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />} />
        </Routes>
      </Wrapper>
    );

    cy.wait('@entityGet');

    cy.wait('@entityPostCollectionGet');

    cy.get('.PostCollection').should('have.descendants', '.CollectionEmpty');
  });

  it('@entityPostCollectionGet: success: [ ... ]  :: .PostCollection > .CollectionEmpty', () => {
    const user = {
      id: '420689f6-10e2-4714-a988-bc8ff630b628',
      email: 'EMAIL'
    };

    cy.intercept('GET', `/user/${user.id}`, {
      statusCode: 200,
      body: user
    }).as('entityGet');

    cy.intercept('GET', `/user/${user.id}/post?limit=1&offset=0`, {
      statusCode: 200,
      body: {
        collection: [
          {
            id: '326b9f72-efa5-4b5b-9247-b6a03c17de31',
            text: 'TEXT01'
          }
        ],
        info: {
          userId: user.id,
          hasMore: true
        }
      }
    }).as('entityPostCollectionGet01');

    cy.intercept('GET', `/user/${user.id}/post?limit=1&offset=1`, {
      statusCode: 200,
      body: {
        collection: [
          {
            id: '182771ff-0f07-4dfa-932e-29c11dae7302',
            text: 'TEXT02'
          }
        ],
        info: {
          userId: user.id,
          hasMore: false
        }
      }
    }).as('entityPostCollectionGet02');

    history.pushState(null, null, `/User/${user.id}`);

    mount(
      <Wrapper>
        <Routes>
          <Route path='/User/:id' element={<EntityDetail />} />
        </Routes>
      </Wrapper>
    );

    cy.wait('@entityGet');

    cy.wait('@entityPostCollectionGet01');

    cy.get('.PostCollection').find('.Item').should('have.length', 1);

    cy.wait('@entityPostCollectionGet02');

    cy.get('.PostCollection').find('.Item').should('have.length', 2);
  });
});
