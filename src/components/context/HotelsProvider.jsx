/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,

    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ isLoading, hotels, getHotel, currentHotel, isLoadingCurrHotel }}
    >
      <div className="container mx-auto w-full px-4">{children}</div>
    </HotelContext.Provider>
  );
}
export default HotelsProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useHotels() {
  return useContext(HotelContext);
}
