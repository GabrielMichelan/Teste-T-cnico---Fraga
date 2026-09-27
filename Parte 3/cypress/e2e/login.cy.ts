import { LoginPage } from './pages/LoginPage'

const loginPage = new LoginPage()

describe('SauceDemo - login', () => {
  it('permite entrar com o usuário padrão', () => {
    loginPage.acessar()
    loginPage.entrar('standard_user', 'secret_sauce')
    loginPage.validarLogin()
  })
})
