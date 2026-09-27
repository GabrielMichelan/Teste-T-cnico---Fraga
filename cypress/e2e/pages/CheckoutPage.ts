export class CheckoutPage {
  validarProduto(nome: string): void {
    cy.get('[data-test="inventory-item-name"]').should('contain.text', nome)
  }
  iniciar(): void {
    cy.get('[data-test="checkout"]').click()
    cy.location('pathname').should('eq', '/checkout-step-one.html')
  }
  preencherDados(nome: string, sobrenome: string, cep: string): void {
    cy.get('[data-test="firstName"]').type(nome)
    cy.get('[data-test="lastName"]').type(sobrenome)
    cy.get('[data-test="postalCode"]').type(cep)
    cy.get('[data-test="continue"]').click()
    cy.location('pathname').should('eq', '/checkout-step-two.html')
  }
  finalizar(): void { cy.get('[data-test="finish"]').click() }
  validarPedidoConcluido(): void {
    cy.location('pathname').should('eq', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
  }
}
