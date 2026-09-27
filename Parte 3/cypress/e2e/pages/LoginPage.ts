export class LoginPage {
  acessar(): void { cy.visit('https://www.saucedemo.com/') }
  entrar(usuario: string, senha: string): void {
    cy.get('[data-test="username"]').type(usuario)
    cy.get('[data-test="password"]').type(senha, { log: false })
    cy.get('[data-test="login-button"]').click()
  }
  validarLogin(): void {
    cy.location('pathname').should('eq', '/inventory.html')
    cy.get('[data-test="inventory-container"]').should('be.visible')
  }
}
