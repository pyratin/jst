'use strict';

import React from 'react';
import { mount } from '@cypress/react';

import Wrapper from 'test/client/Component/Wrapper';
import AuthorizationForm from 'client/Route/User/Component/AuthorizationForm';

describe('AuthorizationForm', () => {
  it('actionType: entityAuthenticate :: button[type=submit].text(Signin)', () => {
    mount(
      <Wrapper>
        <AuthorizationForm
          actionType='entityAuthenticate'
          input={{}}
          error={null}
        />
      </Wrapper>
    );

    cy.get('button[type=submit]').should('have.text', 'Signin');
  });

  it('actionType: entityCreate :: button[type=submit].text(Signup)', () => {
    mount(
      <Wrapper>
        <AuthorizationForm actionType='entityCreate' input={{}} />
      </Wrapper>
    );

    cy.get('button[type=submit]').should('have.text', 'Signup');
  });

  it('button[type=submit].click() :: onSubmitHandle.called', () => {
    const onSubmitHandle = cy.stub();

    mount(
      <Wrapper>
        <AuthorizationForm
          actionType='entityAuthenticate'
          input={{}}
          onSubmit={onSubmitHandle}
        />
      </Wrapper>
    );

    cy.get('button[type=submit]')
      .click()
      .then(() => {
        expect(onSubmitHandle).to.be.called;
      });
  });

  it('input: { email: ... } :: input[data-key=email].value(...)', () => {
    const email = 'user01@test.com';

    mount(
      <Wrapper>
        <AuthorizationForm actionType='entityAuthenticate' input={{ email }} />
      </Wrapper>
    );

    cy.get('input[data-key="email"]').should('have.value', email);
  });

  it('input: { password: ... } :: input[data-key=password].value(...)', () => {
    const password = 'user01Test';

    mount(
      <Wrapper>
        <AuthorizationForm
          actionType='entityAuthenticate'
          input={{ password }}
        />
      </Wrapper>
    );

    cy.get('input[data-key="password"]').should('have.value', password);
  });

  it('error: { email } :: input[data-key=email].is-invalid', () => {
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
        <AuthorizationForm
          actionType='entityAuthenticate'
          input={{}}
          error={error}
        />
      </Wrapper>
    );

    cy.get('input[data-key="email"]')
      .should('have.class', 'is-invalid')
      .parents('.inputGroup')
      .find('.invalidFeedback')
      .should('have.text', error._error[0].message);
  });

  it('error: { password } :: input[data-key=password].is-invalid', () => {
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
        <AuthorizationForm
          actionType='entityAuthenticate'
          input={{}}
          error={error}
        />
      </Wrapper>
    );

    cy.get('input[data-key="password"]')
      .should('have.class', 'is-invalid')
      .parents('.inputGroup')
      .find('.invalidFeedback')
      .should('have.text', error._error[0].message);
  });
});
