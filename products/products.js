import data from '../data.json';
import { ErrorResponse } from "../utils/error-handler";

export const getProducts = async () => {
    if (!data) {
        throw new ErrorResponse('Products not found!', '404');
    }

    try {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
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
