import {ErrorResponse} from "../utils/error-handler";

export const basicAuthorizer = async event => {

    try {

    } catch (_err) {
        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};
