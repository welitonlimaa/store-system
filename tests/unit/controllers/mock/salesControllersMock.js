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

module.exports = {
  createdSale,
  errorInvalidValue,
}