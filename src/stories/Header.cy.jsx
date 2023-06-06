import React from 'react'
import { composeStories } from '@storybook/react';
import { Button } from './Button'
import * as HeaderStories from './Header.stories';
const {LoggedIn} = composeStories(HeaderStories);


describe('<Header Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoggedIn />)

    cy.get('div').contains('Welcome, Jeff');

  })
})