"use client"
import { useState } from 'react';
import Image from 'next/image';
import { base_url } from "@/base_url";

const dummydata = [
  {
    "id": 1,
    "name": "Meluha - The Fern",
    "email": "hotel@gmail.com",
    "city": "Mumbai",
    "country": "India",
    "reviewRatings": 4.3,
    "stars": 4,
    "rooms": {
      "type": "Deluxe Rooms"
    },
    "about": "With spectacular views of Arabian Sea and beautiful Mumbai, Taj Lands End Mumbai offers luxury accommodation to meet the needs of business and leisure travellers. The contemporarily decorated guest rooms at this 5-star property are equipped with comfy bedding, flat-screen TV and an en suite marble bathroom..",
    "address": "Band Stand,400 050,Mumbai",
    "phone": 7894651320,
    "fax": 6548954123,
    "price": 99,
    "facilities": [
      "offers fitness center",
      "Breakfast",
      "AC",
      "Free WiFi",
      "Spa"
    ]
  }
]

const Hero = () => {
  const [data, setData] = useState([]);

  const handleFilter = async (city) => {
    try {
      const res = await fetch(`${base_url}/search/hotels/id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = await res.json();
      setData(message);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <section className="relative h-[500px] w-auto z-0">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/top-hotel.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      {dummydata.map(item => (
        <div key={item.id} className="relative flex flex-col items-center justify-center h-full  text-white pointer-events-auto">
          <h1 className="md:text-[70px] text-[60px] font-bold mb-8 mt-[130px]">{item.name}</h1>
          <h2 className="text-lg md:text-[19px] text-[14px]">{item.city}, {item.country}</h2>

        </div>
      ))}


    </section>
  );
};

export default Hero;