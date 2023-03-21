import { ErrorResponse } from "../utils/error-handler";
import AWS from "aws-sdk";

const lambda = new AWS.Lambda({ region: 'eu-west-1' });

export const catalogBatchProcess = async event => {
    const products = event.Records.map(({body}) => body);

    try {
        await new Promise((resolve, reject) => {
            products.map(async (product) => {
                const payload = JSON.stringify({ body: product });
                const params = {
                    FunctionName: 'products-service-dev-createProduct',
                    Payload: payload,
                };

                lambda.invoke(params, (error, data) => {
                    if (error) {
                        reject(error);
                        throw new ErrorResponse(error);
                    }

                    console.log('data lambda invoke', data);
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
