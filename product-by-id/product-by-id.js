import data from '../data.json';
import { ErrorResponse } from "../utils/error-handler";

export const getProductById = async event => {
    const { id } = event.pathParameters;
    const productById = data.find(product => product.id === id);

    if (!productById) {
        throw new ErrorResponse('Product not found!', '404');
    }

    try {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(productById),
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
