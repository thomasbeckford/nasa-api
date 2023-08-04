import { Providers } from '@/app/providers'

describe('<Providers />', () => {
  it('renders', () => {
    // Render the Providers component with a simple div as children
    cy.mount(
      <Providers>
        <div data-testid="test-children">This is a test children!!!</div>
      </Providers>
    )

    // Check if the Test Children div is visible and contains the correct text
    cy.get('[data-testid="test-children"]')
      .should('be.visible')
      .contains('This is a test children!!!')
  })
})
