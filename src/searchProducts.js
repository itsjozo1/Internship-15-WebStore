const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Greška u dohvačanju proizvoda:', error);
        throw error;
    }
}

export { getProducts };
