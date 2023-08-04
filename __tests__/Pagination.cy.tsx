import Pagination from '@/components/Pagination'

describe('<Pagination />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Pagination
        currentPage={0}
        totalItems={0}
        totalPhotos={0}
        itemsPerPage={0}
        onPageChange={function (pageNumber: number): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
  })
})
