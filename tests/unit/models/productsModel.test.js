const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { products } = require('./mock/productsMock');


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

  afterEach(function () {
    sinon.restore();
  });
});