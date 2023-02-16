const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newSale, sales, salesById } = require('./mock/salesModelMock');

describe('Testes de unidade do Model de Sales', function () {
  it('Cadastrando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const saleId = 1;
    const { productId, quantity } = newSale;

    const result = await salesModel.insertSaleProduct(saleId, productId, quantity);

    expect(result).to.equal(4);
  });

  it('Listando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(sales);
  });

  it('Listando venda por id', async function () {
    sinon.stub(connection, 'execute').resolves([salesById]);

    const result = await salesModel.getById(1);

    expect(result).to.be.deep.equal(salesById);
  });

  it('Deleta uma venda', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const resultSaleProduct = await salesModel.deleteSaleProduct(1);
    const resultSale = await salesModel.deleteSale(1);

    expect(resultSaleProduct).to.be.deep.equal(true);
    expect(resultSale).to.be.deep.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});