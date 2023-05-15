describe('Home page', () => {
  it('shoud have ', () => {
    cy.visit("/");
    cy.get('input').should('have.value', '')
    cy.get('button').should('have.text', 'Обновить все курсы валют')
  })

  it('shoud send request', () => { 
    cy.visit("/");
    cy.intercept(
      {
        method: 'GET',
        url: `${process.env.API_PATH}/USD`,
      },
      [{"id":"AUD","name":"Австралийский доллар","price":"1.51"},{"id":"AZN","name":"Азербайджанский манат","price":"1.70"},{"id":"BYN","name":"Белорусский рубль","price":"2.53"},{"id":"BGN","name":"Болгарский лев","price":"1.80"},{"id":"BRL","name":"Бразильский реал","price":"4.92"},{"id":"EUR","name":"ЕВРО","price":"0.91"},{"id":"RUS","name":"Рубль","price":"77.36"},{"id":"CHF","name":"Швейцарский франк","price":"0.90"},{"id":"TRY","name":"Турецкая лира","price":"19.59"}]
    ).as('getCurrency')

    cy.contains('Обновить все курсы валют').click()
    cy.request(`${process.env.API_PATH}/USD`).its('status').should('eq', 200)
  })
})