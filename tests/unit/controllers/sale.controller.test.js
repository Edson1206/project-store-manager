const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { saleService } = require("../../../src/services");
const { saleController } = require("../../../src/controllers")
const { newSale, newSaleById, invalidSale, } = require("./mocks/sale.controller.mock");

const { expect } = chai;
chai.use(sinonChai);

const { message } = newSaleById;
const { message: invalidMessage } = invalidSale;

describe("Sale controller unit tests", () => {
  afterEach(sinon.restore);

  it("Inserting a new sale successfully", async () => {
    const req = { body: newSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(message);
    sinon.stub(saleService, 'createSale').resolves({ type: null, message });

    await saleController.createSales(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(message)).to.be.true;
  });

  it("Returns an error when passing an invalid parameter", async () => {
    const req = { body: newSale };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(invalidMessage);
    sinon.stub(saleService, 'createSale').resolves(invalidSale);

    await saleController.createSales(req, res);

    expect(res.status.calledWith(400)).to.be.false;
    expect(res.json.calledWith(invalidMessage));
  });

  it("Retrieving the sale list", async () => {
      const stub = sinon.stub(saleService, 'getAllSales').resolves(newSale);

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await saleController.getAllSales({}, res)
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(response).to.deep.equal(newSale);
  });

    it("Retrieving a sale from its id", async () => {
      const stub = sinon.stub(saleService, 'getSaleById').resolves({
        type: null,
        message: newSaleById,
      });

      const req = { params: { id: "6" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await saleController.getSaleById(req, res);
      const [response] = res.json.firstCall.args;

      expect(stub.calledOnce).to.be.true;
      expect(stub.calledWith("6")).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(response).to.deep.equal(newSaleById);
    });
});