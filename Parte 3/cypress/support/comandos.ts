import { CREDENCIAIS } from './dados-teste'
import type {
  PayloadReserva,
  Reserva,
  RespostaAutenticacao,
  RespostaCriacaoReserva,
} from './tipos'

declare global {
  namespace Cypress {
    interface Chainable {
      gerarToken(): Chainable<string>
      criarReserva(payload: PayloadReserva): Chainable<{ id: number; reserva: Reserva }>
      buscarReserva(
        id: number,
        falharComStatusDeErro?: boolean,
      ): Chainable<Response<Reserva>>
      atualizarReserva(
        id: number,
        payload: PayloadReserva,
        token?: string,
        falharComStatusDeErro?: boolean,
      ): Chainable<Response<Reserva>>
      excluirReserva(
        id: number,
        token?: string,
        falharComStatusDeErro?: boolean,
      ): Chainable<Response<string>>
    }
  }
}

Cypress.Commands.add('gerarToken', () => {
  return cy
    .request<RespostaAutenticacao>({
      method: 'POST',
      url: '/auth',
      body: CREDENCIAIS,
    })
    .then((resposta) => {
      expect(resposta.status, 'status da autenticação').to.eq(200)
      expect(resposta.body.token, 'token gerado').to.be.a('string').and.not.be.empty
      return resposta.body.token as string
    })
})

Cypress.Commands.add('criarReserva', (payload: PayloadReserva) => {
  return cy
    .request<RespostaCriacaoReserva>({
      method: 'POST',
      url: '/booking',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload,
    })
    .then((resposta) => {
      expect(resposta.status, 'status da criação').to.eq(200)
      expect(resposta.body.bookingid, 'id da reserva').to.be.a('number')

      return {
        id: resposta.body.bookingid,
        reserva: resposta.body.booking,
      }
    })
})

Cypress.Commands.add(
  'buscarReserva',
  (id: number, falharComStatusDeErro = true) => {
    return cy.request<Reserva>({
      method: 'GET',
      url: `/booking/${id}`,
      headers: { Accept: 'application/json' },
      failOnStatusCode: falharComStatusDeErro,
    })
  },
)

Cypress.Commands.add(
  'atualizarReserva',
  (
    id: number,
    payload: PayloadReserva,
    token?: string,
    falharComStatusDeErro = true,
  ) => {
    return cy.request<Reserva>({
      method: 'PUT',
      url: `/booking/${id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Cookie: `token=${token}` } : {}),
      },
      body: payload,
      failOnStatusCode: falharComStatusDeErro,
    })
  },
)

Cypress.Commands.add(
  'excluirReserva',
  (id: number, token?: string, falharComStatusDeErro = true) => {
    return cy.request<string>({
      method: 'DELETE',
      url: `/booking/${id}`,
      headers: token ? { Cookie: `token=${token}` } : undefined,
      failOnStatusCode: falharComStatusDeErro,
    })
  },
)

export {}
