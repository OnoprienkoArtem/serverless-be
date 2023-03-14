import AWS from 'aws-sdk';
import {ErrorResponse} from "../../../utils/error-handler";

export const importProductsFile = async event => {
    const s3 = new AWS.S3({ region: 'us-east-1' });
    const BUCKET = 'products-upload-s3bucket';
    const queryParamName = event.queryStringParameters.name;
    const catalogName = `uploaded/${queryParamName}`;
    const params = {
        Bucket: BUCKET,
        Key: catalogName,
        ContentType: 'text/csv'
    }

    try {
        const signedUrl = s3.getSignedUrl('putObject', params);
        console.log('GET, statusCode: 200, /import \n', JSON.stringify(signedUrl));
        return {
            statusCode: '200',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(signedUrl),
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
