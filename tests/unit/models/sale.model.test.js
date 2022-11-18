const { expect } = require("chai");
const sinon = require("sinon");
const { saleModel } = require("../../../src/models");

const connection = require('../../../src/models/connection');
const { saleArray, saleObj, saleByIdArray, saleByIdObj } = require("./mocks/sale.model.mock");


describe('Sale model unit tests', function () {
 afterEach(sinon.restore);
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

  it("Retrieving the sale list", async () => {
    sinon.stub(connection, "execute").resolves(saleArray);

    const result = await saleModel.getAllSales();

    expect(result).to.deep.equal(saleObj);
  });
  
  it("Retrieving a sale from its id", async () => {
    const response = sinon
      .stub(connection, "execute")
      .resolves(saleByIdArray);

    const results = await saleModel.getSaleById("7");
    const [, [paramId]] = response.firstCall.args;

    expect(response.calledOnce).to.be.true;
    expect(paramId).to.equal("7");
    expect(results).to.deep.equal(saleByIdObj);
  });

});