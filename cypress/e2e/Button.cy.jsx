describe('<Button Secondary />', () => {
  it('renders', () => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=example-button--primary&viewMode=story')
    const prevButton = cy.get('button').contains('Button');
    prevButton.click();
  })
})