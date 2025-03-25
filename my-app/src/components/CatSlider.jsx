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
            const screenWidth = window.innerWidth;
            const scrollAmount = screenWidth < 768 ? 250 : 400; // Adaptive scroll distance

            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full md:pt-10 md:pb-10 pt-10 pb-4 relative">
            <div className="max-w-xs md:max-w-7xl relative">
                <h2 className="text-xl font-semibold capitalize">Featured Categories</h2>

                {/* Scroll Buttons */}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 cursor-pointer hidden md:flex"
                    onClick={() => scroll("left")}
                >
                    <AiOutlineLeft className="text-xl" />
                </button>

                <div
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide py-4 px-4 md:px-0"
                >
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-3 cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center border border-gray-300 shadow"
                                style={{ backgroundColor: bgColors[index % bgColors.length] }}
                            >
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-full p-2"
                                />
                            </div>
                            <span className="mt-2 font-medium text-xs md:text-sm">{category.name}</span>
                        </div>
                    ))}
                </div>

                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 cursor-pointer hidden md:flex"
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
