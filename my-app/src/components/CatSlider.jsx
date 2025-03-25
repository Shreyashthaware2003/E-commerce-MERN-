import React, { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function CatSlider() {
    const categories = [
        { name: "Fashion", img: "/fashion.png" },
        { name: "Electronics", img: "/electronics.png" },
        { name: "Bags", img: "/home-kitchen.jpg" },
        { name: "Footwear", img: "/sports.jpg" },
        { name: "Groceries", img: "/sports.jpg" },
        { name: "Beauty", img: "/sports.jpg" },
        { name: "Wellness", img: "/sports.jpg" },
        { name: "Jewellery", img: "/sports.jpg" },
        { name: "Mug", img: "/sports.jpg" },
    ];

    const bgColors = ["#ECFFEC", "#FFECEC", "#ECECFF", "#FFF4D6"];
    const sliderRef = useRef(null);

    // Scroll function
    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 400; // Adjust scroll distance
            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full py-10 relative">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>

                {/* Scroll Buttons */}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md z-10 hover:bg-gray-400 cursor-pointer"
                    onClick={() => scroll("left")}
                >
                    <AiOutlineLeft className="text-xl" />
                </button>

                <div
                    ref={sliderRef}
                    className="flex gap-10 overflow-x-auto py-4 scroll-smooth scrollbar-hide"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 cursor-pointer hover:-translate-y-2 duration-300 transition-transform">
                            <div
                                className="w-28 h-28 rounded-full flex items-center justify-center border border-gray-300 shadow"
                                style={{ backgroundColor: bgColors[index % bgColors.length] }}
                            >
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="w-24 h-24 object-cover rounded-full p-2"
                                />
                            </div>
                            <span className="mt-2 font-medium text-sm">{category.name}</span>
                        </div>
                    ))}
                </div>

                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md z-10 hover:bg-gray-400 cursor-pointer"
                    onClick={() => scroll("right")}
                >
                    <AiOutlineRight className="text-xl" />
                </button>
            </div>

            {/* Hide scrollbar */}
            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
        </div>
    );
}

export default CatSlider;
