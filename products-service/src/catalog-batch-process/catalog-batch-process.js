import { ErrorResponse } from "../utils/error-handler";

export const catalogBatchProcess = async event => {
    console.log('event', event);
    const products = event.Records.map(({body}) => body);

    try {
        console.log('catalogBatchProcess products', products);

    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};
