import {ErrorResponse} from "../utils/error-handler";
import AWS from "aws-sdk";
import {v4 as uuid} from 'uuid';

const dynamodb = new AWS.DynamoDB;

export const createProduct = async event => {
    const {title, description, price, count} = JSON.parse(event.body);
    console.log('createProduct - JSON.parse(event.body)', JSON.parse(event.body));
    const id = uuid();
    const params = {
        TransactItems: [
            {
                Put: {
                    Item: {
                        "id": { "S": id },
                        "title": { "S": title },
                        "description": { "S": description },
                        "price": { "N": price.toString() }
                    },
                    TableName: process.env.PRODUCTS_TABLE_NAME,
                }
            },
            {
                Put: {
                    Item: {
                        "product_id": { "S": id },
                        "count": { "N": count.toString() }
                    },
                    TableName: process.env.STOCKS_TABLE_NAME,
                }
            }
        ],
    };

    if (!params) {
        throw new ErrorResponse('Bad Request!', '400');
    }

    try {
        await dynamodb.transactWriteItems(params).promise();
        console.log(`POST, statusCode: 200, /products/${id} \n`, JSON.stringify({id, title, description, price, count}));
        return {
            statusCode: '201',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({id, title, description, price, count}),
        };
    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            err = new ErrorResponse();
        }
        return err;
    }
};
