const { expect } = require('chai');
const sinon = require('sinon');
const { findAll, findById } = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const { allProducts, invalidValue } = require('./mocks/product.service.mock');

describe('Product service unit tests', function () {

  describe('Product listing', function () {
    
    it('Retrieving the product list', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts)

      const result = await findAll();

      expect(result.message).to.deep.equal(allProducts);
    });

  });

  describe('Product search', function () {
    
    it('Returns an error if it receives an invalid ID', async function () {
      const result = await findById(invalidValue);
      
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
     
      const result = await findById(1);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message.message).to.equal('Product not found');
    });

  });

});