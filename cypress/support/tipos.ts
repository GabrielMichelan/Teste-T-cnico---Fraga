export interface DatasReserva {
  checkin: string
  checkout: string
}

/**
 * Os nomes das propriedades permanecem em inglês porque fazem parte
 * do contrato oficial da API Restful Booker.
 */
export interface PayloadReserva {
  firstname: string
  lastname: string
  totalprice: number
  depositpaid: boolean
  bookingdates: DatasReserva
  additionalneeds?: string
}

export interface Reserva extends PayloadReserva {}

export interface RespostaCriacaoReserva {
  bookingid: number
  booking: Reserva
}

export interface RespostaAutenticacao {
  token?: string
  reason?: string
}
