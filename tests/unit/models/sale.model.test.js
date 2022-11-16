const { expect } = require("chai");
const sinon = require("sinon");
const { saleModel } = require("../../../src/models");

const connection = require('../../../src/models/connection');

describe('Sale model unit tests', function () {

  it('Inserting a new sale in sales and sales_products', async function () {

    const NEW_PRODUCT_ID = 2;
    const NEW_PRODUCT_QUANTITY = 3;
    
    sinon
      .stub(connection, "execute")
      .onFirstCall()
      .resolves([{ insertId: 1 }])
      .onSecondCall()
      .resolves([{ insertId: 2 }]);
      
    const validId = await saleModel.insertSale();
    await saleModel.insertSaleProduct(
      validId,
      NEW_PRODUCT_ID,
      NEW_PRODUCT_QUANTITY,
    );

    expect(validId).to.be.deep.equal(1);
  });

});