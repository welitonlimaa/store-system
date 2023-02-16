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

const salesList = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const saleListById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const errorInvalidValue = {
  type: "INVALID_VALUE",
  message: {
    message: '"quantity" must be greater than or equal to 1'
  }
};

const notfound = { type: 'NOT_FOUND', message: { message: 'Product not found' } };

const saleNotFound = { type: 'NOT_FOUND', message: { message: 'Sale not found' } }

module.exports = {
  newSale,
  createdSale,
  errorInvalidValue,
  notfound,
  newSaleError,
  salesList,
  saleListById,
  saleNotFound,
}