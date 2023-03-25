import { ErrorResponse } from "../utils/error-handler";
import AWS from "aws-sdk";

const lambda = new AWS.Lambda({ region: 'eu-west-1' });
const SNS = new AWS.SNS({ region: 'eu-west-1' });

export const catalogBatchProcess = async event => {
    try {
        const products = event.Records.map(({body}) => body);
        console.log('products', products);
        return new Promise((resolve, reject) => {
            products.forEach((product) => {
                const payload = JSON.stringify({ body: product });
                const params = {
                    FunctionName: 'products-service-dev-createProduct',
                    Payload: payload,
                };

                console.log('PRODUCT', products);

                lambda.invoke(params, (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    console.log('PRODUCT', data);

                    SNS.publish({
                        Subject: 'Product was added',
                        Message: JSON.stringify({ body: data }),
                        TopicArn: process.env.SNS_ARN,
                        MessageAttributes: {
                            title: {
                                DataType: 'String',
                                StringValue: JSON.parse(product.body)?.title,
                            },
                        },
                    }, (error, result) => {
                        if (error) {
                            console.error('SNS error', error);
                        }
                        console.log('SNS result', result)
                    });

                    resolve(JSON.stringify({ body: data }));
                });
            });
        });
    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};
