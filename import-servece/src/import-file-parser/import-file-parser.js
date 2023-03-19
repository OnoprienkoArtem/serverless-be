import AWS from 'aws-sdk';
import csv from 'csv-parser';
import {ErrorResponse} from "../utils/error-handler";

export const importFileParser = async event => {
    const sqs = new AWS.SQS();
    const s3 = new AWS.S3({region: 'us-east-1'});
    const catalogName = event.Records[0].s3.object.key;
    const BUCKET = 'products-upload-s3bucket';
    const params = {
        Bucket: BUCKET,
        Key: catalogName,
    };
    const putParams = {
        Bucket: BUCKET,
        Key: catalogName.replace('uploaded', 'parsed'),
    };

    try {
        const s3Stream = s3.getObject(params).createReadStream();

        await new Promise(() => {
            s3Stream.pipe(csv())
                .on('data', data => {
                    console.log('parsed data =>', data);

                    sqs.sendMessage({
                        MessageBody: data,
                        QueueURL: 'catalogItemsQueue'
                    }, () => {
                        console.log('Send message: ', data);
                    })
                })
                .on('error', error => {
                    console.error('error in stream =>', error);
                })
                .on('end',  () => {
                    console.log('stream end');

                    s3.putObject(putParams).promise();
                    s3.deleteObject(params).promise();
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
