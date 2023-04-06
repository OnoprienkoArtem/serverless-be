import {catalogBatchProcess} from "../catalog-batch-process/catalog-batch-process";
const mod = require('../catalog-batch-process/catalog-batch-process');
const jestPlugin = require('serverless-jest-plugin');
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, {handler: 'catalogBatchProcess'});

import AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
    const mLambda = { invoke: jest.fn() };
    const mSns = { publish: jest.fn() };
    return {
        Lambda: jest.fn(() => mLambda),
        SNS: jest.fn(() => mSns)
    };
});

describe('catalogBatchProcess', () => {
    const event = {
        Records: [
            { body: { id: 1, title: 'Product-1', price: 10 } },
            { body: { id: 2, title: 'Product-2', price: 12 } },
        ],
    };
    const mSns = AWS.SNS();

    beforeEach(() => {
        mSns.publish.mockImplementationOnce((_params, callback) => {
            callback(null, {});
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should invoke lambda function for each item', async () => {
        await catalogBatchProcess(event);
        expect(AWS.Lambda).toHaveBeenCalledTimes(2);
        expect(AWS.Lambda.mock.instances[0].invoke).toHaveBeenCalledWith({
            FunctionName: 'products-service-dev-createProduct',
            Payload: JSON.stringify({ body: event.Records[0].body }),
        }, expect.any(Function));
        expect(AWS.Lambda.mock.instances[1].invoke).toHaveBeenCalledWith({
            FunctionName: 'products-service-dev-createProduct',
            Payload: JSON.stringify({ body: event.Records[1].body }),
        }, expect.any(Function));
    });

    it('should publish SNS message after creating each product', async () => {
        const mockInvoke = jest.fn((params, callback) => {
            callback(null, { Payload: JSON.stringify({ id: 1, title: 'Product-1', price: 10 }) });
        });
        AWS.Lambda.mockImplementation(() => ({ invoke: mockInvoke }));

        await catalogBatchProcess(event);

        expect(AWS.SNS).toHaveBeenCalledTimes(2);
        expect(AWS.SNS.mock.instances[0].publish).toHaveBeenCalledWith({
            Subject: 'Product was added',
            Message: JSON.stringify({ body: { id: 1, title: 'Product-1', price: 10 } }),
            TopicArn: process.env.SNS_ARN,
        }, expect.any(Function));
        expect(AWS.SNS.mock.instances[1].publish).toHaveBeenCalledWith({
            Subject: 'Product was added',
            Message: JSON.stringify({ body: { id: 2, title: 'Product-2', price: 12 } }),
            TopicArn: process.env.SNS_ARN,
        }, expect.any(Function));
    });

    it('should handle error when invoking lambda function', async () => {
        const mockInvoke = jest.fn((params, callback) => {
            callback(new Error('Lambda error'));
        });
        AWS.Lambda.mockImplementation(() => ({ invoke: mockInvoke }));
        const result = await catalogBatchProcess(event);

        expect(result).toEqual(new ErrorResponse('Internal Server Error'));
    });

    it('should return statusCode 500 by any error', () => {
        event.Records = '';
        return wrapped.run(event).catch(error => {
            expect(error.statusCode).toBe('500');
        })
    });
});
