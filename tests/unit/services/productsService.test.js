const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { products } = require('./mock/productsMock');

describe('Verificando Products services', function () {
  it('retorna a lista completa de pessoas passageiras', async function () {

    sinon.stub(productsModel, 'getAll').resolves(products);

    const result = await productsService.getAllProducts();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(products);
  });

  it('retorna um erro caso a pessoa passageira não existe', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.getProductsById(1);

    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message.message).to.equal('Product not found');
  });

  it('retorna a pessoa passageira caso ID existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(products[0]);

    const result = await productsService.getProductsById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});