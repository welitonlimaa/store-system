const newSale = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const newSaleError = [
  {
    productId: 1,
    quantity: -1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const createdSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

const errorInvalidValue = {
  type: "INVALID_VALUE",
  message: {
    message: '"quantity" must be greater than or equal to 1'
  }
};

const notfound = { type: 'NOT_FOUND', message: { message: 'Product not found' } }

module.exports = {
  newSale,
  createdSale,
  errorInvalidValue,
  notfound,
  newSaleError,
}