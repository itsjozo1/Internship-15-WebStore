import { useEffect, useState } from 'react';
import { getProducts } from "./searchProducts";

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const createProductPreviewCard = (product) => {
        return (
            <div key={product.id} className="product-preview-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
            </div>
        );
    }

    const productsCards = products.map(createProductPreviewCard);

    return (
        <div className='products-container'>
            <div className="filter-products-container">
                {productsCards}
            </div>
        </div>
    );
}

export default ProductsPage;
