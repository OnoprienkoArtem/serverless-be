import { ErrorResponse } from "../../../utils/error-handler";
import AWS from "aws-sdk";
import {mergeProductsAndStocks} from "../../../utils/utils";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getProductById = async event => {
    const { id } = event.pathParameters;

    const productById = await dynamodb.query({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {':id': id }
    }).promise();
    const stockById = await dynamodb.query({
        TableName: process.env.STOCKS_TABLE_NAME,
        KeyConditionExpression: 'product_id = :product_id',
        ExpressionAttributeValues: {':product_id': id }
    }).promise();

    if (!productById || !stockById) {
        throw new ErrorResponse('Product not found!', '404');
    }

    try {
        console.log(`GET, statusCode: 200, /products/${id} \n`, JSON.stringify(mergeProductsAndStocks(productById.Items, stockById.Items)));
        return {
            statusCode: '200',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(mergeProductsAndStocks(productById.Items, stockById.Items)[0]),
        };
    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};
