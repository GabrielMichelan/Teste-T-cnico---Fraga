export class InventoryPage {
  adicionarProduto(nome: string): void {
    cy.contains('[data-test="inventory-item"]', nome).find('button[data-test^="add-to-cart-"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  }
  abrirCarrinho(): void {
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.location('pathname').should('eq', '/cart.html')
  }
}
