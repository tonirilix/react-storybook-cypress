describe('<Header Login />', () => {
  it('renders', () => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=example-header--logged-in&viewMode=story')

    cy.get('div').contains('Welcome, Jeff');

  })
})