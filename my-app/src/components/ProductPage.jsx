import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Products from './Products';

function ProductPage() {
    const [activeCategory, setActiveCategory] = useState("Fashion"); // Default category

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar setActiveCategory={setActiveCategory} />

            {/* Products Section */}
            <div className="flex-1 p-4">
                {/* Show Active Category Name */}
                <h1 className="text-2xl font-bold text-center md:text-left mb-4">
                    Showing Products for: <span className="text-blue-600">{activeCategory}</span>
                </h1>

                {/* Products Component */}
                <Products activeCategory={activeCategory} />
            </div>
        </div>
    );
}

export default ProductPage;
