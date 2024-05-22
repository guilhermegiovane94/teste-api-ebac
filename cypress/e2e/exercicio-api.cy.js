/// <reference types="cypress" />
import usuarios from "../contracts/usuarios.contrato";

describe('Testes da Funcionalidade Usuários', () => {
  let token 
  let numeroRandom = Math.floor(Math.random() * 100000)
 
  beforeEach(()=>{
    cy.token("fulano@qa.com", "teste").then(tkn => {
        token = tkn
    })        
})

  it('Deve validar contrato de usuários', () => {
    //TODO: 
    cy.request('usuarios').then(response=>{
      return usuarios.validateAsync(response.body)
     })  
  });

  it('Deve listar usuários cadastrados', () => {
    //TODO: 
      cy.request({
        method: 'GET',
        url: 'usuarios',
        headers: {authorization: token},
        failOnStatusCode: false
      }).should(response => {
          expect(response.body.quantidade).not.equal(0)
          expect(response.status).to.equal(200)
      })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    //TODO: 
    let numeroRandom = Math.floor(Math.random() * 100000)
    cy.cadastrarUsuario(token, 'Carlos Counter', `carloscounter${numeroRandom}@teste.com`, 'teste@123', 'true').should((response) => {
    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    expect(response.status).to.equal(201)
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    //TODO: 
    
    cy.cadastrarUsuario(token, 'Carlos Counter', `carloscounter${numeroRandom}`, 'teste@123', 'true').should((response) => {
    expect(response.body.email).to.equal('email deve ser um email válido')
    expect(response.status).to.equal(400)
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
    cy.cadastrarUsuario(token, 'Carlos Counter', `carloscounter@teste.com`, 'teste@123', 'true').should((response) => {
      expect(response.body.message).to.equal('Este email já está sendo usado')
      expect(response.status).to.equal(400)
      });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
    cy.cadastrarUsuario(token, 'Carlos Counter', `carloscounter${numeroRandom}@teste.com`, 'teste@123', 'true').then(response =>{
      let id = response.body._id
      cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: {authorization: token}
      }).should(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
      })
  })
  });


});
