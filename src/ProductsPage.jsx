import { useEffect, useState } from 'react';
import { getProducts, getCategories } from "./searchProducts";

function ProductsPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await getProducts(selectedCategory);
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Greška u dohvaćanju proizvoda:', error);
            }
        };

        fetchData();
    }, [selectedCategory]);

    const createProductPreviewCard = (product) => {
        return (
            <div key={product.id} className="product-preview-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
            </div>
        );
    };

    return (
        <div className='products-container'>
            <div className='filter-products-container'>
                <h1>Pretraži proizvode</h1>
                <h2>Naziv proizvoda</h2>
                <input type="text" placeholder='Ime proizvoda' className='filter-products-name-input'/>
                <h2>Kategorije</h2>
                <div className='categories-buttons-container'>
                    {categories.map((category) => 
                        <button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)} 
                            className={selectedCategory === category ? 'category-button-selected' : 'category-button'}
                        >
                            {category}
                        </button>
                    )}
                </div>
            </div>
            <div className="filter-products-results-container">
                {products.map(createProductPreviewCard)}
            </div>
        </div>
    );
}

export default ProductsPage;
