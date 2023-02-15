const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { products, newProduct, updatedProduct } = require('./mock/productsMock');


describe('Testes de unidade do model de products', function () {
  it('lista todos os produtos', async function () {

    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('lista produto por id', async function () {

    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await productsModel.insert(newProduct);

    expect(result).to.equal(3);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(updatedProduct);

    const result = await productsModel.update(1, newProduct);

    expect(result.name).to.be.deep.equal('ProdutoX');
  });

  // it('Deletando um produto', async function () {
  //   sinon.stub(connection, 'execute').resolves();

  //   const result = await productsModel.update(1, newProduct);

  //   console.log()
  // });

  afterEach(function () {
    sinon.restore();
  });
});