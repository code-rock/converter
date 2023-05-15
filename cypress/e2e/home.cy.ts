describe('Home page', () => {
  it('shoud have ', () => {
    cy.visit("/")
    cy.get('input').should('have.value', '')
    cy.get('button').should('have.text', 'Обновить все курсы валют')
    cy.get('div[class*="singleValue"]').should('have.text', 'Доллар США')
    cy.get('#currency')
    cy.get('nav').find('a').should('have.length', 2)
  })
 
  it('menu navigation', () => {
    cy.visit("/")

    cy.contains('Главная').click()
    cy.location('pathname').should('eq', '/')

    cy.contains('Конвертер').click()
    cy.location('pathname').should('eq', '/converter')
    cy.go('back')
  })

  it('select currency', () => { 
    cy.visit("/")

    cy.intercept(
      {
        method: 'GET',
        url: `${process.env.API_PATH}/USD`,
      },
      [{"id":"AUD","name":"Австралийский доллар","price":"1.51"},{"id":"AZN","name":"Азербайджанский манат","price":"1.70"},{"id":"BYN","name":"Белорусский рубль","price":"2.53"},{"id":"BGN","name":"Болгарский лев","price":"1.80"},{"id":"BRL","name":"Бразильский реал","price":"4.92"},{"id":"EUR","name":"ЕВРО","price":"0.91"},{"id":"RUS","name":"Рубль","price":"77.36"},{"id":"CHF","name":"Швейцарский франк","price":"0.90"},{"id":"TRY","name":"Турецкая лира","price":"19.59"}]
    ).as('getCurrency')

    cy.get('[class*="-control"]')
      .click(0, 0, { force: true })
      .get('[class*="-menu"]')
      .find('[class*="-option"]')
      .eq(1)
      .click(0, 0, { force: true })

    cy.get('div[class*="singleValue"]').should('have.text', 'Рубль')
    cy.request(`${process.env.API_PATH}/RUS`).its('status').should('eq', 200)
  })

  it('shoud send request', () => { 
    cy.visit("/")
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