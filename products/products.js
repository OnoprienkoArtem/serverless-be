// import data from '../data.json';
import {ErrorResponse} from "../utils/error-handler";
import AWS from 'aws-sdk';
import {mergeProductsAndStocks} from "../utils/utils";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getProducts = async () => {
    const products = await dynamodb.scan({
        TableName: process.env.PRODUCTS_TABLE_NAME,
    }).promise();
    const stocks = await dynamodb.scan({
        TableName: process.env.STOCKS_TABLE_NAME,
    }).promise();

    if (!products || !stocks) {
        throw new ErrorResponse('Products not found!', '404');
    }

    try {
        console.log('GET, statusCode: 200, /products \n', JSON.stringify(mergeProductsAndStocks(products.Items, stocks.Items)));
        return {
            statusCode: '200',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(mergeProductsAndStocks(products.Items, stocks.Items)),
        }
    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};

