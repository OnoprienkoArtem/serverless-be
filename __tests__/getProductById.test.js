
'use strict';

// tests for getProductById
// Generated by serverless-jest-plugin

const mod = require('./../product-by-id/product-by-id');
const data = require('../data.json');
const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'getProductById' } );
const event = {
  pathParameters: {
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
  },
}

describe('getProductById', () => {
  beforeAll((done) => {
    done();
  });

  it('should return product by id', () => {
    return wrapped.run(event).then((response) => {
      expect(response.statusCode).toBe('200');
      expect(response.body).toEqual(JSON.stringify(data[0]));
    });
  });

  it('should return statusCode 404 by incorrect id', () => {
    event.pathParameters.id = 'incorrect-id';
    return wrapped.run(event).catch(error => {
      expect(error.statusCode).toBe('404');
      expect(error.body).toEqual(JSON.stringify({"message": "Product not found!"}));
    })
  });
});
