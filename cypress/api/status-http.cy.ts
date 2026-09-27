import { gerarReservaValida } from '../support/dados-teste'

describe('AC-HTTP | Códigos HTTP e comportamento do protocolo', () => {
  it('P0 | retorna 200 ao criar uma reserva', () => {
    cy.request('POST', '/booking', gerarReservaValida())
      .its('status')
      .should('eq', 200)
  })

  it('P0 | retorna 200 ao consultar uma reserva existente', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.buscarReserva(id).its('status').should('eq', 200)
    })
  })

  it('P1 | retorna 404 para uma reserva inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/booking/999999999',
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.eq(404)
    })
  })

  it('P1 | rejeita método não suportado em um recurso de reserva', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.request({
        method: 'POST',
        url: `/booking/${id}`,
        body: gerarReservaValida(),
        failOnStatusCode: false,
      }).then((resposta) => {
        // Dependendo do roteamento da implementação, uma rota existente
        // com método incorreto pode resultar em 404 ou 405.
        expect(resposta.status).to.be.oneOf([404, 405])
      })
    })
  })

  it('P2 | endpoint de saúde responde com sucesso', () => {
    cy.request('/ping').then((resposta) => {
      // A documentação do Restful Booker define 201 para /ping.
      expect(resposta.status).to.eq(201)
    })
  })
})
