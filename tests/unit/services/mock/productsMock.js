const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  }
];

const newProduct = {
  id: 3,
  name: "ProdutoX"
}

const mockError = {
  type: "INVALID_VALUE",
  message: {
    message: '"name" length must be at least 5 characters long'
  }
};

const notfound = { type: 'NOT_FOUND', message: { message: 'Product not found' } }

module.exports = {
  products,
  newProduct,
  mockError,
  notfound,
}