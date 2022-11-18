const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const {
  newSale,
  productResponse1,
  productResponse2,
  saleResponse,
} = require('./mocks/sale.service.mock');


describe('Sale service unit tests', function () {
  it('Sale listing', async function () {
    const stub = sinon.stub(saleModel, 'getAllSales').resolves(newSale);
    const response = await saleService.getAllSales();
  
    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal(newSale);
  });

  
  it("Inserting a new sale successfully", async function () {
   
      sinon.stub(productModel, 'findById')
      .onFirstCall()
      .resolves([productResponse1])
        .onSecondCall()
        .resolves([productResponse2]);

      sinon.stub(saleModel, 'insertSale').resolves(5);
      
      sinon
        .stub(saleModel, 'insertSaleProduct')
        .onFirstCall()
        .resolves({"productId":1,"quantity":4})
        .onSecondCall()
        .resolves({"productId":2,"quantity":5});
        
      const products = await saleService.createSale(newSale);
      
      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({
        id: 5,
        itemsSold: newSale,
      });
  });
  
  describe("Retrieving a sale from its id", function () {
    it("With valid id", async function () {
      const INVALID_ID = 20;
      sinon.stub(saleModel, 'getSaleById').resolves([]);
  
      const error = await saleService.getSaleById(INVALID_ID);
  
      expect(error.type).to.equal("SALE_NOT_FOUND");
      expect(error.message).to.equal("Sale not found");
    });
  
    it("With invalid id", async function () {
      const VALID_ID = 2;
      sinon.stub(saleModel, 'getSaleById').resolves(saleResponse);
  
      const product = await saleService.getSaleById(VALID_ID);
  
      expect(product.type).to.equal(null);
      expect(product.message).to.be.deep.equal(saleResponse);
    });
  
  });
  
  it('Returns an error when passing an invalid product', async function () {
    const stub = sinon.stub(productModel, 'findById').resolves(undefined);
    const stubSalesInsert = sinon.stub(saleModel, 'insertSale').resolves(1);
    const response = await saleService.createSale([
      { productId: 1, quantity: 5 },
    ]);
    expect(stub.calledOnce).to.be.true;
    expect(response).to.deep.equal({
      type: 'PRODUCT_NOT_FOUND',
      message: "Product not found",
    });
    expect(stubSalesInsert.called).to.be.false;
  });

  afterEach(function () {
    sinon.restore();
  });

});