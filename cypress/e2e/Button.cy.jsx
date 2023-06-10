import React from 'react'
import { composeStories } from '@storybook/react';
import { Button } from './Button'
import * as ButtonStories from './Button.stories';
const {Large, Secondary, Primary} = composeStories(ButtonStories);


// describe('<Button Large />', () => {
//   it('renders', () => {
//     // see: https://on.cypress.io/mounting-react
//     cy.mount(<Large />)
//   })
// })

describe('<Button Secondary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Primary />)

    const prevButton = cy.get('button'); //.contains('Button');
    prevButton.click();

  })
})