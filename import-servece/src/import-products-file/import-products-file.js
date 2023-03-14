const AWS = require('aws-sdk');

exports.importProductsFile = async event => {
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
    } catch (err) {
        console.log(err);
        return {
            statusCode: '500',
            body: JSON.stringify({ message: 'An error occurred' }),
        };
    }
};
