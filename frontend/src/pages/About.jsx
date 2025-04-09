import React from 'react';

function About() {
    return (
        <div className=" my-[95px] px-4 max-w-7xl mx-auto flex flex-col flex-nowrap justify-center items-center" style={{fontFamily:"Poppins"}}>
            
            {/* ABOUT US Heading */}
            <div className="text-2xl text-center pt-8 border-t border-gray-300 w-full">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">
                        ABOUT <span className="text-gray-700 font-medium">US</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
            </div>

            {/* About Content */}
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    className="w-full md:max-w-[450px]"
                    src="about.png"
                    alt="About Us"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                    </p>
                    <p>
                        Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                    </p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                    </p>
                </div>
            </div>

            {/* WHY CHOOSE US Section */}
            <div className="text-xl py-4">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">
                        WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20 border border-gray-400 ">
                <div className="border-r border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">
                        We meticulously select and vet each product to ensure it meets our stringent quality standards.
                    </p>
                </div>
                <div className="border-r border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
                    <b>Convenience:</b>
                    <p className="text-gray-600">
                        With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
                    </p>
                </div>
                <div className="border-r border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
                    <b>Exceptional Customer Service:</b>
                    <p className="text-gray-600">
                        Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
                    </p>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="text-center">
                <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
                <p className="text-gray-400 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                    <input
                        className="w-full sm:flex-1 outline-none"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit" className="bg-black text-white text-xs px-10 py-4">
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </div>
    );
}

export default About;
