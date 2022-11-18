const newSale = [
  {
    productId: 1,
    quantity: 4,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleArray = [
  {
    productId: 1,
    quantity: 3,
  },
];

const saleObj = {
  productId: 1,
  quantity: 3,
};

const saleByIdArray = [
  {
    type: null,
    message: {
      id: 3,
      itemsSold: newSale,
    },
  },
];

const saleByIdObj = {
  type: null,
  message: {
    id: 3,
    itemsSold: newSale,
  },
};

module.exports = {
  newSale,
  saleArray,
  saleObj,
  saleByIdArray,
  saleByIdObj,
};