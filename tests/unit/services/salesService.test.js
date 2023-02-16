const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const schema = require('../../../src/services/validations/schemas');

const {
  createdSale,
  newSale,
  notfound,
  newSaleError,
  errorInvalidValue,
  salesList,
  saleListById,
  saleNotFound
} = require('./mock/salesServiceMock');

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

  it('retorna a lista com todas as vendas', async function () {

    sinon.stub(salesModel, 'getAll').resolves(salesList);

    const result = await salesService.getAllSales();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(salesList);
  });

  it('retorna a lista com a pesquisa de venda por id', async function () {
    sinon.stub(salesModel, 'getById').resolves(saleListById);

    const result = await salesService.getSaleById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(saleListById);
  });

  it('retorna erro com id de venda inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves([undefined]);

    const result = await salesService.getSaleById(99);

    expect(result).to.deep.equal(saleNotFound);
  });

  afterEach(function () {
    sinon.restore();
  });
});
