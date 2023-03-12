export function mergeProductsAndStocks(products, stocks) {
    return products.reduce((acc, product) => {
        stocks
            .filter(stock => product.id === stock.product_id)
            .forEach(stock => acc.push({...product, ...{count: stock.count}}));
        return acc;
    }, [])
}
