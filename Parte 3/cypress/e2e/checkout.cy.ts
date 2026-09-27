import { LoginPage } from './pages/LoginPage'
import { InventoryPage } from './pages/InventoryPage'
import { CheckoutPage } from './pages/CheckoutPage'

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const checkoutPage = new CheckoutPage()
const produto = 'Sauce Labs Backpack'

describe('SauceDemo - checkout', () => {
  it('conclui a compra de um produto', () => {
    loginPage.acessar()
    loginPage.entrar('standard_user', 'secret_sauce')
    loginPage.validarLogin()
    inventoryPage.adicionarProduto(produto)
    inventoryPage.abrirCarrinho()
    checkoutPage.validarProduto(produto)
    checkoutPage.iniciar()
    checkoutPage.preencherDados('Gabriel', 'Teste', '01001-000')
    checkoutPage.validarProduto(produto)
    checkoutPage.finalizar()
    checkoutPage.validarPedidoConcluido()
  })
})
