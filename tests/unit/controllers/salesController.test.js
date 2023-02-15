const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { createdSale, errorInvalidValue } = require('./mock/salesControllersMock');

describe('Teste de unidade do Sales Controller', function () {
  it('Deve retornar o status 201 ao cadastrar novo produto', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSaleProduct')
      .resolves({ type: null, message: createdSale });

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createdSale);
  });

  it('Deve retornar o status 422 quando quantity for menor que 1', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSaleProduct')
      .resolves(errorInvalidValue);

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(errorInvalidValue.message);
  });

  afterEach(function () {
    sinon.restore();
  });
});