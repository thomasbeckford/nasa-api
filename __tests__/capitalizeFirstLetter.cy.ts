import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

describe('capitalizeFirstLetter function', () => {
  it('should capitalize the first letter of a word', () => {
    const input = 'hello'
    const expectedOutput = 'Hello'

    cy.wrap(input).then((str) => {
      const result = capitalizeFirstLetter(str)
      expect(result).to.equal(expectedOutput)
    })
  })

  // Add more test cases as needed
})
