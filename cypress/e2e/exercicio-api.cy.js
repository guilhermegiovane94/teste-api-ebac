/// <reference types="cypress" />
import usuarios from "../contracts/usuarios.contrato";

describe('Testes da Funcionalidade Usuários', () => {


  it('Deve listar cupoms cadastrados', () => {
    cy.fixture('cupom').then((data) => {
      cy.request({
        method: 'GET',
        url: 'coupons',
        headers: {
          authorization: data.authorization
        }
      }).then((response) => {
        // cy.log(response)
        expect(response.status).to.equal(200)
      });
    });
  });


  it('Cadastrar cupom', () => {

    let numeroRandom = Math.floor(Math.random() * 100000)
    cy.fixture('cupom').then((data) => {
      cy.request({
        method: 'POST',
        url: 'coupons',
        headers: {
          authorization: data.authorization
        },
        body: {
          code: `nomeCupom${numeroRandom}`,
          amount: '10',
          discount_type: 'fixed_product'
        }
      }).then((response) => {
        // cy.log(response)
        expect(response.status).to.equal(201)
      });
    });


  });

});

