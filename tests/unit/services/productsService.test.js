const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { products, newProduct, mockError, notfound } = require('./mock/productsMock');

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

  it('retorna novo produto cadastrado', async function () {
    sinon.stub(productsModel, 'insert').resolves(3);
    sinon.stub(productsModel, 'getById').resolves(newProduct);

    const result = await productsService.createProduct(newProduct.name);

    expect(result.message).to.deep.equal(newProduct);
  });

  it('retorna error caso o nome do produto tenha menos que 5 caracteres', async function () {
    const name = 'Pr'
    const result = await productsService.createProduct(name);

    expect(result).to.deep.equal(mockError);
  });

  it('retorna o produto atualizado', async function () {
    sinon.stub(productsModel, 'update').resolves(true);
    sinon.stub(productsModel, 'getById').resolves(newProduct);

    const result = await productsService.updateProduct(1, newProduct.name);

    expect(result.message).to.deep.equal(newProduct);
  });

  it('retorna error ao tentar atualizar um produto inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.updateProduct(99, newProduct.name);

    expect(result.message).to.deep.equal(notfound.message);
  });

  afterEach(function () {
    sinon.restore();
  });
});