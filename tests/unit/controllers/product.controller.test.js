const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const productController = require('../../../src/controllers/product.controller');
const { productMock, newProductMock } = require('./mocks/product.controller.mock');

describe('Product controller unit tests', function () {

  it('Retrieving the product list', async function () {
    const res = {};
    const req = {};
    const productList = [newProductMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findAll')
      .resolves({ type: null, message: productList });
    
    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });

  it('Retrieving a product from its id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves({ type: null, message: newProductMock });
    
    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Returns an error if it receives an invalid ID', async function () {
    const res = {};
    const req = {
      params: { id: 4 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  })

  afterEach(sinon.restore);
});