"use client";

import DatePicker from "react-datepicker";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { base_url } from "@/base_url";
import { toast } from "react-toastify";

const showservice = [
  {
    id: 1,
    name: "Event Registration",
  },
  {
    id: 2,
    name: "Luxury Items",
  },
  {
    id: 3,
    name: "Procurement Services",
  },
];

const villaType = [
  {
    id: 1,
    name: "Luxury Lakeside Villa",
  },
  {
    id: 2,
    name: "Luxury Beachside Villa",
  },
];

const BoxSection = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [tab, setTab] = useState("hotels");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const countryRef = useRef(null);
  const cityRef = useRef(null);

  const api = base_url;

  useEffect(() => {
    // Fetch countries when the component mounts
    axios
      .get(`${base_url}/newHotel/countries-alphabetical`)
      .then((response) => {
        const data = response.data.filter((country) => country !== "Various");
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch cities when a country is selected
    if (selectedCountry) {
      axios
        .get(`${base_url}/newHotel/cities-by-country/${selectedCountry}`)
        .then((response) => {
          setCities(response.data.cities);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity(""); // Reset city selection when country changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    if (!selectedCountry) {
      countryRef.current.focus();
      return;
    }

    if (!selectedCity) {
      cityRef.current.focus();
      return;
    }
    router.push(`/hotelsin?city=${selectedCity}&country=${selectedCountry}`);
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".check-in-date") &&
      !event.target.closest(".check-out-date") &&
      !event.target.closest(".city-search") &&
      !event.target.closest(".location-search")
    ) {
      // setCheckInOpen(false);
      // setCheckOutOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let KEY = process.env.NEXT_PUBLIC_KEY;

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", KEY);
    formData.append("location", location);
    formData.append("checkInDate", checkInDate);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Form submission error", error);
      setResult(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  return (
    <div className=" min-h-[400px] sm:min-h-[500px] mt-12  mb-14 md:mb-0 flex justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center  md:pt-0 pt-[60px] text-black px-4">
        <div className=" w-[55rem] p-8  bg-[#0000000D] rounded-3xl">
          <h1 className="md:text-[50px] text-[20px]  font-bold mx-auto">
            Discover Luxurious Adventures
          </h1>
          <p className="text-[15px] font-f_2 text-black">
            Discover the perfect space for you!
          </p>

          <div className="mt-14 m-auto px-2 md:px-8 pb-8 pt-3 rounded-3xl md:max-w-[763px] sm:max-w-[450px] max-w-[360px] w-full bg-white">
            <div className="rounded-3xl sm:px-4 sm:py-4 text-black">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setTab("hotels")}
                  className={`px-2 sm:px-4 text-sm md:text-xl py-2 font-semibold ${
                    tab === "hotels" ? "border-b-2 border-black" : ""
                  }`}
                >
                  Hotels
                </button>
              </div>
              <hr className="border-gray-300 -mt-[17px] mx-2 mr-2 w-full mb-8" />

              {tab === "hotels" && (
                <>
                  <div className="flex items-center mb-4 w-full">
                    <div className="flex justify-between city-search px-2 gap-4 w-full">
                      <>
                        <select
                          className={`px-4 py-2 bg-gray-200 rounded-lg w-1/2 ${
                            selectedCountry
                              ? "focus:outline-blue-400"
                              : "focus:outline-red-400"
                          }`}
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          ref={countryRef}
                        >
                          <option className="sm:text-xs text-gray-700" value="">
                            Select Country
                          </option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </>

                      <div>
                      </div>

                      <select
                        id="city"
                        className={`px-4 py-2 bg-gray-200 rounded-lg flex-grow w-1/2 ${
                          selectedCity
                            ? "focus:outline-blue-400"
                            : "focus:outline-red-400"
                        }`}
                        value={selectedCity}
                        onChange={handleCityChange}
                        disabled={!selectedCountry}
                        ref={cityRef}
                      >
                        <option value="" className="sm:text-xs text-gray-700">
                          Select a city
                        </option>
                        {Array.isArray(cities) &&
                          cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <button
                      onClick={handleSearch}
                      className="bg-black mt-3 w-full text-white px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                      Search
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxSection;
