import data from '../data.json';

export const getProducts = async () => {
    if (data) {
        throw new Error('Products not found!');
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
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify(
                {
                    message: error.errorMessage,
                },
            ),
        }
    }
};
