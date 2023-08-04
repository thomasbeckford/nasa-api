import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers'

describe('generatePaginationNumbers function', () => {
  it('should show all page numbers without ellipsis if total pages are small', () => {
    const props = {
      currentPage: 1,
      totalPages: 5,
    }

    const expectedOutput = [1, 2, 3, 4, 5]

    cy.wrap(props).then((props) => {
      const result = generatePaginationNumbers(props)
      expect(result).to.deep.equal(expectedOutput)
    })
  })
})
