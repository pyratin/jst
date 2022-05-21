'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Shared/Wrapper';
import AuthorizationForm from 'client/Route/User/Shared/Form';

describe('Form', () => {
  it('props.actionType: entityAuthenticate :: [type=submit].text', () => {
    mount(
      <Wrapper>
        <AuthorizationForm actionType='entityAuthenticate' input={{}} />
      </Wrapper>
    );

    cy.get('[type=submit]').should('have.text', 'Signin');
  });

  it('props.actionType: entityCreate :: [type=submit].text', () => {
    mount(
      <Wrapper>
        <AuthorizationForm actionType='entityCreate' input={{}} />
      </Wrapper>
    );

    cy.get('[type=submit]').should('have.text', 'Signup');
  });

  it('props.input: { email } :: [data-key="email"].value', () => {
    const input = {
      email: 'EMAIL',
      password: ''
    };

    mount(
      <Wrapper>
        <AuthorizationForm input={input} />
      </Wrapper>
    );

    cy.get('[data-key="email"]').should('have.value', input.email);
  });

  it('props.input: { password } :: [data-key="password"].value', () => {
    const input = {
      email: '',
      password: 'PASSWORD'
    };

    mount(
      <Wrapper>
        <AuthorizationForm input={input} />
      </Wrapper>
    );

    cy.get('[data-key="password"]').should('have.value', input.password);
  });

  it('props.loading: false :: [type=submit] !> .LoadingInline', () => {
    mount(
      <Wrapper>
        <AuthorizationForm input={{}} loading={false} />
      </Wrapper>
    );

    cy.get('[type=submit]').should('not.have.descendants', '.LoadingInline');
  });

  it('props.loading: true :: [type=submit] > .LoadingInline', () => {
    mount(
      <Wrapper>
        <AuthorizationForm input={{}} loading={true} />
      </Wrapper>
    );

    cy.get('[type=submit]').should('have.descendants', '.LoadingInline');
  });

  it('[data-key="email"].type() :: [data-key="email"].value', () => {
    const email = 'EMAIL';

    mount(
      <Wrapper>
        <AuthorizationForm input={{ email: '' }} />
      </Wrapper>
    );

    cy.get('[data-key="email"]').type(email);

    cy.get('[data-key="email"]').should('have.value', email);
  });

  it('[data-key="password"].type() :: [data-key="password"].value', () => {
    const password = 'PASSWORD';

    mount(
      <Wrapper>
        <AuthorizationForm input={{ password: '' }} />
      </Wrapper>
    );

    cy.get('[data-key="password"]').type(password);

    cy.get('[data-key="password"]').should('have.value', password);
  });

  it('props.error: { email } :: [data-key="email"].is-invalid', () => {
    const error = {
      _error: [
        {
          source: 'email',
          message: 'ERROR'
        }
      ]
    };

    mount(
      <Wrapper>
        <AuthorizationForm input={{}} error={error} />
      </Wrapper>
    );

    cy.get('[data-key="email"]').should('have.class', 'is-invalid');

    cy.get('[data-key-error="email"]').should(
      'have.text',
      error._error[0].message
    );
  });

  it('props.error: { password } :: [data-key="password"].is-invalid', () => {
    const error = {
      _error: [
        {
          source: 'password',
          message: 'ERROR'
        }
      ]
    };

    mount(
      <Wrapper>
        <AuthorizationForm input={{}} error={error} />
      </Wrapper>
    );

    cy.get('[data-key="password"]').should('have.class', 'is-invalid');

    cy.get('[data-key-error="password"]').should(
      'have.text',
      error._error[0].message
    );
  });

  it('[type=submit].click() :: props.onSubmit.called', () => {
    const input = {
      email: 'user01@test.com',
      password: 'PASSWORD'
    };

    const onSubmitHandle = cy.stub().as('onSubmitHandle');

    mount(
      <Wrapper>
        <AuthorizationForm input={input} onSubmit={onSubmitHandle} />
      </Wrapper>
    );

    cy.get('[type=submit]').click();

    cy.get('@onSubmitHandle').should('have.been.calledWith', input);
  });
});
