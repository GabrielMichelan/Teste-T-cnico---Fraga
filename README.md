## Instalação e execução do projeto automação em Cypress

## Pré-requisitos ##
- Node.js e npm instalados;
- acesso à internet para executar os testes nas aplicações;
- Ao clonar este repositório, a pasta `node_modules` não será baixada, pois ela não é versionada no Git. As dependências necessárias estão declaradas nos arquivos `package.json` e `package-lock.json`.


1. Acesse a pasta do projeto Cypress
```bash
cd "Parte 3/cypress"
```

2. Instale as dependências

```bash
npm install
```
- Esse comando instalará automaticamente todas as dependências necessárias para execução do projeto, incluindo o **Cypress** e o **TypeScript**.

- Não é necessário instalar essas dependências individualmente.


3. Abra o Cypress
```bash
npm run test:abrir
```

Também é possível utilizar:
```bash
npx cypress open
```


# Suítes de testes com Cypress — Restful Booker e SauceDemo

Este projeto contém testes de API para o **Restful Booker** e testes E2E para o **SauceDemo**.

## Escopo dos testes de API

As validações cobrem:

- envio de requisições HTTP;
- status codes e body das respostas;
- autenticação e utilização do token;
- encadeamento de chamadas usando dados retornados pela API;
- reaproveitamento de comandos e massas de teste;
- fluxo CRUD completo: `POST → GET → PUT → GET → DELETE → GET 404`;
- operações protegidas sem credenciais e com token inválido;
- validação dos principais campos e tipos do contrato;
- payload incompleto, tipos inválidos e JSON malformado;
- recurso inexistente, método HTTP incorreto e endpoint de saúde.

A suíte de API também contempla priorização P0, P1 e P2 e matriz de rastreabilidade.

## Relatório da execução no CI

O workflow **API tests** executa as specs de API em pushes e pull requests para `main` e pode ser iniciado manualmente. Ele gera um relatório JUnit XML por spec e publica os arquivos como artefato **api-test-report**, mesmo quando os testes falham. Para consultar: abra a aba **Actions** do repositório, selecione uma execução de **API tests** e baixe **api-test-report** na seção **Artifacts**. O artefato fica disponível por até 30 dias, conforme as configurações de retenção do repositório.

## Escopo dos testes E2E

Os testes E2E acessam [SauceDemo](https://www.saucedemo.com/) e cobrem dois cenários:

1. **Login:** entrar com o usuário padrão e validar que o inventário foi exibido.
2. **Checkout:** entrar na aplicação, adicionar a *Sauce Labs Backpack* ao carrinho, preencher os dados do comprador, finalizar o pedido e validar a mensagem de confirmação.

A automação segue o padrão **Page Object**. As ações e validações das páginas estão em `e2e/pages/`, enquanto os cenários estão em `e2e/login.cy.ts` e `e2e/checkout.cy.ts`.


## Executar todas as suítes

O comando abaixo executa as specs de API e E2E:

```powershell
npm test
```

## Executar os testes E2E

Login:

```powershell
npx cypress run --spec "e2e/login.cy.ts"
```

Checkout:

```powershell
npx cypress run --spec "e2e/checkout.cy.ts"
```

Login e checkout:

```powershell
npx cypress run --spec "e2e/**/*.cy.ts"
```

## Abrir o Cypress no modo visual

```powershell
npm run test:abrir
```

Na interface, escolha **E2E Testing**, selecione um navegador e abra `login.cy.ts` ou `checkout.cy.ts`.

## Executar os testes de API

CRUD:

```powershell
npx cypress run --spec "api/crud.cy.ts"
```

Autenticação:

```powershell
npx cypress run --spec "api/autenticacao.cy.ts"
```

Contrato:

```powershell
npx cypress run --spec "api/contrato.cy.ts"
```

Códigos HTTP:

```powershell
npx cypress run --spec "api/status-http.cy.ts"
```

## Com mais tempo para evoluir o projeto, eu trabalharia nos seguintes pontos:

1. Aumentar a cobertura dos testes E2E: ampliaria a cobertura dos cenários de Login e Checkout, incluindo mais casos de teste e estruturando suítes com cenários positivos e negativos para cada fluxo.
2. Refatorar e otimizar o código: buscaria reduzir etapas desnecessárias e melhorar a performance da execução. Por exemplo, na suíte de Checkout, o login poderia ser realizado via API, em vez de executar todo o fluxo pela interface (E2E), otimizando nosso tempo. Além de criar variáveis para alocar os localizadores de elemento de página para facilitar a manuntenção futura. 
3. Ampliar a cobertura dos testes de API: adicionaria novos casos de teste para validar outros campos obrigatórios, diferentes combinações de payloads inválidos e suas respectivas mensagens de erro, aumentando a cobertura das validações da API. 
