import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Select() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [searchQuery, setSearchQuery] = useState("");

    // Category list
    const categories = [
        "Milk and Dairies",
        "Wines & Drinks",
        "Clothing & Beauty",
        "Fresh Seafood",
        "Pet Foods & Toy",
        "Fast Food",
        "Baking Material",
        "Vegetables",
        "Fresh Fruit",
        "Bread and Juice",
    ];

    // Filtered categories based on search query
    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle selection
    const handleSelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
        setSearchQuery(""); // Reset search input
    };

    return (
        <div className="relative inline-block">
            {/* Dropdown Toggle Button */}
            <span
                className="text-sm left-0 border-r-2 px-2 cursor-pointer flex items-center gap-1 w-42 justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCategory} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="bg-white rounded-sm shadow-md absolute md:top-10 left-0 w-44 p-2 z-10">
                    <div className="flex flex-col">
                        {/* Search Input */}
                        <div className="w-full flex justify-center items-center mb-2">
                            <input
                                type="text"
                                className="w-40 h-6 p-2 text-sm border-2 rounded-sm focus:outline-none"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* List of Categories */}
                        <ul className="flex flex-col text-sm max-h-40 overflow-y-auto custom-scrollbar gap-2 py-2">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-orange-500 hover:text-white cursor-pointer px-2 py-1"
                                        onClick={() => handleSelect(category)}
                                    >
                                        {category}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 px-2 py-1">No results found</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Select;
