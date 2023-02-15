const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const schema = require('../../../src/services/validations/schemas');

const { createdSale, newSale, notfound, newSaleError, errorInvalidValue } = require('./mock/salesServiceMock');

describe('Verificando Sales Service', function () {
  it('retorna uma novo venda cadastrada', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(3);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(true);
    sinon.stub(salesModel, 'getSalesProducts').resolves(createdSale.itemsSold);

    const result = await salesService.createSaleProduct(newSale);

    expect(result.message).to.deep.equal(createdSale);
  });

  it('retorna not found quando campo productId inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await salesService.createSaleProduct(newSale);

    expect(result).to.deep.equal(notfound);
  });

  it('retorna invalid value error se quantity for menor que 1', async function () {
    const result = await salesService.createSaleProduct(newSaleError);

    expect(result).to.deep.equal(errorInvalidValue);
  });

  afterEach(function () {
    sinon.restore();
  });
});
