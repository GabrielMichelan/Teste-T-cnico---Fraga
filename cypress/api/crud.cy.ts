import {
  gerarReservaAtualizada,
  gerarReservaValida,
} from '../support/dados-teste'

describe('AC-CRUD | Fluxo completo de reservas', () => {
  it('P0 | cria, consulta, atualiza e exclui uma reserva usando o mesmo id', () => {
    const reservaInicial = gerarReservaValida()
    const reservaAtualizada = gerarReservaAtualizada()

    // 1. Cria a reserva e guarda o id retornado pela API.
    cy.criarReserva(reservaInicial).then(({ id, reserva }) => {
      expect(reserva).to.deep.include(reservaInicial)

      // 2. Consulta a mesma reserva pelo id gerado no POST.
      cy.buscarReserva(id).then((respostaConsulta) => {
        expect(respostaConsulta.status).to.eq(200)
        expect(respostaConsulta.body).to.deep.include(reservaInicial)
      })

      // 3. Gera o token necessário para as operações protegidas.
      cy.gerarToken().then((token) => {
        // 4. Atualiza a reserva usando PUT.
        cy.atualizarReserva(id, reservaAtualizada, token).then((respostaAtualizacao) => {
          expect(respostaAtualizacao.status).to.eq(200)
          expect(respostaAtualizacao.body).to.deep.equal(reservaAtualizada)
        })

        // 5. Consulta novamente para confirmar a persistência da atualização.
        cy.buscarReserva(id).then((respostaConsultaAtualizada) => {
          expect(respostaConsultaAtualizada.status).to.eq(200)
          expect(respostaConsultaAtualizada.body).to.deep.equal(reservaAtualizada)
        })

        // 6. Exclui a reserva.
        cy.excluirReserva(id, token).then((respostaExclusao) => {
          // A documentação do Restful Booker define 201 para DELETE com sucesso.
          expect(respostaExclusao.status).to.eq(201)
        })

        // 7. Confirma que o recurso realmente deixou de existir.
        cy.buscarReserva(id, false).then((respostaPosExclusao) => {
          expect(respostaPosExclusao.status).to.eq(404)
        })
      })
    })
  })
})
