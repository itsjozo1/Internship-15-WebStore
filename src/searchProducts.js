const getProducts = async (selectedCategory, limit) => {
    try {
        let baseUrl = "https://fakestoreapi.com/products";

        if (selectedCategory) {
            baseUrl += `/category/${selectedCategory}`;
        }

        if (limit) {    
            baseUrl += `?limit=${limit}`;
        }
        const response = await fetch(baseUrl);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Greška u dohvačanju proizvoda:', error);
        throw error;
    }
}



const getCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Greška u dohvačanju kategorija:', error);
        throw error;
    }
}

export { getProducts, getCategories };
