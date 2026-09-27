import type { PayloadReserva } from './tipos'

/**
 * Gera uma massa válida e permite sobrescrever apenas os campos
 * necessários em cada cenário.
 */
export const gerarReservaValida = (
  sobrescritas: Partial<PayloadReserva> = {},
): PayloadReserva => ({
  firstname: 'Gabriel',
  lastname: 'QA',
  totalprice: 950,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-10-15',
    checkout: '2026-10-20',
  },
  additionalneeds: 'Breakfast',
  ...sobrescritas,
})

export const gerarReservaAtualizada = (): PayloadReserva => ({
  firstname: 'Gabriel',
  lastname: 'Automation',
  totalprice: 1200,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-05',
  },
  additionalneeds: 'Late checkout',
})

export const CREDENCIAIS = {
  username: 'admin',
  password: 'password123',
}
