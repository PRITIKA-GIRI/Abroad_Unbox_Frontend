import React, {useState, useEffect} from "react";

export default function NewsSection() {

    const news = [
        {
            image: "https://image.newyorkcity.ca/wp-content/uploads/2018/07/Multi-City-Discount-Pass-USA-Empire-State-Building.jpg.webp",
            title: "New Visa Application Process",
            content: "The visa application process has beem updated. please check the lastest guidelines on our website.",
            link: "https://www.newyorkcity.ca/multi-city-discount-pass-usa/",
        },
        {
            image: "https://image.newyorkcity.ca/wp-content/uploads/2024/02/Multi-City-Discount-Pass-USA-New-York.jpg.webp",
            title: "New Visa Application Process",
            content: "The visa application process has beem updated. please check the lastest guidelines on our website.",
            link: "",
        },
    ]

    return (
        <>
            <div className="w-full">
                <h2 className="py-4 text-xl font-semibold text-center bg-blue-400 rounded-lg">News and Announcement</h2>
            
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col gap-2 mt-3 overflow-auto rounded-t-lg bg-re d-400 p- 2 max-h-64">
                        {news.map((items, index) => (
                            <div key={index} className="flex flex-row-reverse gap-2 p-4 bg-gray-200 rounded-lg ">
                                <img src={items.image} alt="News" className="object-cover w-full h-40 mb-2 rounded-lg" />
                                <div className="space-y-2 text-center">
                                    <h3 className="text-lg font-semibold">{items.title}</h3>
                                    <p>{items.content}</p>
                                    {items.link && (
                                        <a href={items.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Read more
                                        </a>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="p-4 mt-1.5 rounded-b-lg bg-amber-400 min-h-46">
                        
                    </div>
                    
                </div>

            </div>
        </>
    )
}
