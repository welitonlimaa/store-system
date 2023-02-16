const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  products,
  notfound,
  newProduct,
  errorInvalidValue,
  updatedProduct,
  errorIdNotNumber
} = require('./mock/controllerMock');


describe('Teste de unidade do Products Controller', function () {
  it('Deve retornar o status 200 e a lista de todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: products });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Deve retornar o status 404 para a listagem de um produto inexistente', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getProductsById')
      .resolves(notfound);

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notfound.message);
  });

  it('Deve retornar o status 200 para um produto existente', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getProductsById')
      .resolves({ type: null, message: products[0] });

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Deve retornar o status 201 para um novo produto criado', async function () {
    const res = {};
    const req = {
      body: {
        name: "ProdutoX"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'createProduct')
      .resolves({ type: null, message: newProduct });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Deve retornar o status 422 ao tentar inserir um nome com menos de 5 caracteres', async function () {
    const res = {};
    const req = {
      body: {
        name: "Pr"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'createProduct')
      .resolves(errorInvalidValue);

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorInvalidValue.message);
  });

  it('Deve retornar o status 201 para um update bem sucedido', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: {
        name: "ProdutoX"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ message: updatedProduct });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });

  it('Deve retornar o status 404 por tentar atualizar um produto inexistente', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
      body: {
        name: "ProdutoX"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves(notfound);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notfound.message);
  });

  it('Deve retornar o status 422 ao tentar atualizar com name com menos de 5 caracteres', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: {
        name: "Pr"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves(errorInvalidValue);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorInvalidValue.message);
  });

  it('Deve retornar o status 422 ao tentar atualizar com name com menos de 5 caracteres', async function () {
    const res = {};
    const req = {
      params: { id: 'alo' },
      body: {
        name: "ProdutoX"
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'updateProduct')
      .resolves(errorIdNotNumber);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorIdNotNumber.message);
  });

  afterEach(function () {
    sinon.restore();
  });
});