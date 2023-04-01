import {ErrorResponse} from "../utils/error-handler";

export const basicAuthorizer = async event => {
    console.log('Authorizer event', event);

    if (event['type'] !== 'TOKEN') {
        throw new ErrorResponse('Unauthorized', '401');
    }

    try {
        const authorizationToken = event.authorizationToken;
        const encodedCreds = authorizationToken.split(' ')[1];
        const buffer = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buffer.toString('utf-8').split(':');

        const username = plainCreds[0];
        const password = plainCreds[1];
        const storeUserPassword = process.env[username];
        const effect = !storeUserPassword || storeUserPassword !== password ? 'Deny' : 'Allow';

        if (effect === 'Deny') {
            throw new ErrorResponse('Forbidden - access denied', '403');
        }

        return generatePolicy(encodedCreds, event.methodArn, effect);
    } catch (_err) {

        let err = _err;
        if (!(err instanceof ErrorResponse)) {
            console.error(err);
            err = new ErrorResponse();
        }
        return err;
    }
};

const generatePolicy = (principalId, resource, effect = 'Allow') => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: [resource]
                }
            ]
        }
    }
}
