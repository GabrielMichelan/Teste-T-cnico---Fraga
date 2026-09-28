import { gerarReservaValida } from '../support/dados-teste'
import type { RespostaCriacaoReserva } from '../support/tipos'

/**
 * Validação centralizada do contrato básico de resposta.
 * Os nomes dos campos permanecem em inglês por serem definidos pela API.
 */
const validarContratoReserva = (corpo: RespostaCriacaoReserva) => {
  expect(corpo.bookingid).to.be.a('number')
  expect(corpo.booking.firstname).to.be.a('string')
  expect(corpo.booking.lastname).to.be.a('string')
  expect(corpo.booking.totalprice).to.be.a('number')
  expect(corpo.booking.depositpaid).to.be.a('boolean')
  expect(corpo.booking.bookingdates).to.be.an('object')
  expect(corpo.booking.bookingdates.checkin).to.be.a('string')
  expect(corpo.booking.bookingdates.checkout).to.be.a('string')

  if (corpo.booking.additionalneeds !== undefined) {
    expect(corpo.booking.additionalneeds).to.be.a('string')
  }
}

describe('AC-CONTRATO | Contrato de payload e resposta', () => {
  it('P0 | retorna os campos e tipos esperados para uma reserva válida', () => {
    cy.request<RespostaCriacaoReserva>(
      'POST',
      '/booking',
      gerarReservaValida()
    ).then((resposta) => {
      expect(resposta.status).to.eq(200)
      validarContratoReserva(resposta.body)
    })
  })

  it('P1 | verifica comportamento ao enviar payload sem campo obrigatório', () => {
    const { firstname: _firstname, ...payloadIncompleto } =
      gerarReservaValida()

    cy.request({
      method: 'POST',
      url: '/booking',
      body: payloadIncompleto,
      failOnStatusCode: false,
    }).then((resposta) => {
      cy.log(`Status recebido: ${resposta.status}`)
      cy.log(`Resposta: ${JSON.stringify(resposta.body)}`)

      expect(resposta.status).to.be.oneOf([400, 422])
    })
  })

  it('P1 | verifica comportamento ao enviar totalprice com tipo inválido', () => { // Bug encontrado aqui a API retorna 200 memso com o preço total inválido
    const payloadInvalido = {
      ...gerarReservaValida(),
      totalprice: 'novecentos',
    }

    cy.request({
      method: 'POST',
      url: '/booking',
      body: payloadInvalido,
      failOnStatusCode: false,
    }).then((resposta) => {
      cy.log(`Status recebido: ${resposta.status}`)
      cy.log(`Resposta: ${JSON.stringify(resposta.body)}`)

      expect(resposta.status).to.be.oneOf([400, 422])
    })
  })

  it('P1 | verifica comportamento ao enviar depositpaid com tipo inválido', () => { // Bug encontrado aqui a API retorna 200 memso com o depósito pagp inválido
    const payloadInvalido = {
      ...gerarReservaValida(),
      depositpaid: 'sim',
    }

    cy.request({
      method: 'POST',
      url: '/booking',
      body: payloadInvalido,
      failOnStatusCode: false,
    }).then((resposta) => {
      cy.log(`Status recebido: ${resposta.status}`)
      cy.log(`Resposta: ${JSON.stringify(resposta.body)}`)

      expect(resposta.status).to.be.oneOf([400, 422])
    })
  })

  it('P1 | rejeita JSON malformado', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: '{"firstname":"Gabriel",',
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(
        resposta.status,
        `Esperava erro para JSON malformado, mas recebeu ${resposta.status}`
      ).to.be.within(400, 599)
    })
  })

  it('P2 | aceita additionalneeds como campo opcional', () => {
    const {
      additionalneeds: _additionalneeds,
      ...payloadSemCampoOpcional
    } = gerarReservaValida()

    cy.request<RespostaCriacaoReserva>(
      'POST',
      '/booking',
      payloadSemCampoOpcional
    ).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.booking.firstname).to.eq(
        payloadSemCampoOpcional.firstname
      )
      expect(resposta.body.booking.lastname).to.eq(
        payloadSemCampoOpcional.lastname
      )
    })
  })
})
