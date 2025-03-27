import React, { useState } from 'react';

function Products({ activeCategory }) {
    // Dummy products for each category (Replace with real data)
    const productsData = {
        Fashion: ["Shirt", "Jeans", "Jacket"],
        Electronics: ["Laptop", "Smartphone", "Headphones"],
        Bags: ["Handbag", "Backpack", "Wallet"],
        Footwear: ["Sneakers", "Sandals", "Boots"],
        Groceries: ["Rice", "Vegetables", "Fruits"],
        Beauty: ["Lipstick", "Foundation", "Perfume"],
        Wellness: ["Yoga Mat", "Supplements", "Skincare"],
        Jewellery: ["Necklace", "Earrings", "Ring"],
        Mug: ["Coffee Mug", "Tea Cup", "Travel Mug"],
    };

    // Dummy product images for each category (Replace with real paths)
    const productImages = {
        Fashion: "/products/p1.png",
        Electronics: "/products/electronics.png",
        Bags: "/products/bags.png",
        Footwear: "/products/footwear.png",
        Groceries: "/products/groceries.png",
        Beauty: "/products/beauty.png",
        Wellness: "/products/wellness.png",
        Jewellery: "/products/jewellery.png",
        Mug: "/products/mug.png",
    };

    return (
        <div className=" transition-all duration-500 mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {productsData[activeCategory]?.map((item, index) => (
                <div key={index} className=" flex flex-col">
                    <div className="w-full overflow-hidden">
                        <img
                            src={productImages[activeCategory]}
                            alt={item}
                            className="w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{item}</h3>
                    <p className="text-sm text-gray-600">Category: {activeCategory}</p>
                </div>
            ))}
        </div>
    );
}

export default Products;
