const newSale = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 4,
  },
];

const newSaleById = {
  type: null,
  message: {
    id: 6,
    itemsSold: newSale,
  },
};

const invalidSale = {
  type: 'FIELD_REQUIRED',
  message: 'Field required',
};

module.exports = {
  newSale,
  newSaleById,
  invalidSale,
}