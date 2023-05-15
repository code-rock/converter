describe('Converter page', () => {
    it('shoud have inputs', () => {
      cy.visit("/converter");
      cy.get('[id=from]').should('have.value', 1)
      cy.get('[id=to]').should('have.value', 0.013)
    })

    it('recalculate wanted currency when change base amount', () => {
        cy.visit("/converter");

        cy.get('[class*="-control"]')
          .eq(0)
          .find('div[class*="singleValue"]').should('have.text', 'Доллар США')

        cy.get('[id=from]').should('have.value', 1)
        cy.get('[id=to]').should('have.value', 77.36)
        cy.get('[id=from]').type('123').should('have.value', 1123)
        cy.get('[id=to]').should('have.value', 86875.28)
    })
    
    it('change currency', () => {
        cy.visit("/converter");
        cy.get('[class*="-control"]')
        .eq(1)
        .click(0, 0, { force: true })
        .get('[class*="-menu"]')
        .find('[class*="-option"]')
        .eq(2)
        .click(0, 0, { force: true })
        cy.get('[id=to]').should('have.value', 2.53)
        cy.get('[class*="-control"]')
        .eq(0)
        .click(0, 0, { force: true })
        .get('[class*="-menu"]')
        .find('[class*="-option"]')
        .eq(1)
        .click(0, 0, { force: true })
        cy.get('[id=to]').should('have.value', 27.22)
    })
  })