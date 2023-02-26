import data from '../data.json';

export const getProductById = async event => {
    const { id } = event.pathParameters;
    const productById = data.find(product => product.id === id);

    if (productById) {
        throw new Error('Product not found!');
    }

    try {
        return {
            statusCode: 200,
            body: JSON.stringify(productById),
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
