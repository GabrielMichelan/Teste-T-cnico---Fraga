import {
  CREDENCIAIS,
  gerarReservaAtualizada,
  gerarReservaValida,
} from '../support/dados-teste'
import type { RespostaAutenticacao } from '../support/tipos'

describe('AC-AUTH | Autenticação e autorização', () => {
  it('P0 | gera um token com credenciais válidas', () => {
    cy.request<RespostaAutenticacao>('POST', '/auth', CREDENCIAIS).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.token).to.be.a('string').and.not.be.empty
    })
  })

  it('P0 | usa o token gerado para atualizar um recurso protegido', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.gerarToken().then((token) => {
        cy.atualizarReserva(id, gerarReservaAtualizada(), token).then((resposta) => {
          expect(resposta.status).to.eq(200)
        })

        cy.excluirReserva(id, token).its('status').should('eq', 201)
      })
    })
  })

  it('P0 | rejeita atualização sem credenciais', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.atualizarReserva(id, gerarReservaAtualizada(), undefined, false).then((resposta) => {
        expect(resposta.status).to.eq(403)
      })
    })
  })

  it('P0 | rejeita atualização com token inválido', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.atualizarReserva(id, gerarReservaAtualizada(), 'token-invalido', false).then((resposta) => {
        expect(resposta.status).to.eq(403)
      })
    })
  })

  it('P1 | não gera token com credenciais inválidas', () => {
    cy.request<RespostaAutenticacao>({
      method: 'POST',
      url: '/auth',
      body: {
        username: 'usuario-invalido',
        password: 'senha-invalida',
      },
      failOnStatusCode: false,
    }).then((resposta) => {
      
      expect(resposta.body.token).to.not.exist
      expect(resposta.body.reason).to.be.a('string').and.not.be.empty
    })
  })

  it('P1 | rejeita exclusão sem credenciais', () => {
    cy.criarReserva(gerarReservaValida()).then(({ id }) => {
      cy.excluirReserva(id, undefined, false).then((resposta) => {
        expect(resposta.status).to.eq(403)
      })
    })
  })
})
