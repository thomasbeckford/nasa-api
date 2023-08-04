import { SearchProvider } from '@/context/SearchContext'

describe('<SearchProvider />', () => {
  it('renders', () => {
    cy.mount(
      <SearchProvider>
        <div></div>
      </SearchProvider>
    )
  })
})
