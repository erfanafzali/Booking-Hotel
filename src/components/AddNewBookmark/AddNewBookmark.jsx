import axios from "axios";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "This Location is not a city! please click somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks")
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError)
    return (
      <p className="w-full flex justify-center flex-col text-justify text-red-800 items-center lg:pr-10 md:pr-8 sm:pr-6 pr-4 mt-10 sm:mt-12 md:mt-14 lg:mt-16 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
        {geoCodingError}
      </p>
    );

  return (
    <div className="w-full flex justify-center flex-col items-center lg:pr-10 md:pr-8 sm:pr-6 pr-4 mt-10 sm:mt-12 md:mt-14 lg:mt-16 leaflet-control mb-10">
      <h2 className="text-blue-800  w-full font-bold  whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 ">
        Bookmark New Location
      </h2>
      <form action="" className="w-full" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col justify-center items-start">
          <label
            htmlFor="city"
            className="text-white w-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
          >
            CityName :
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
            className="w-full rounded-lg px-1 sm:px-2 md:px-3 lg:px-4 font-semibold outline-0 border-0 text-blue-800 text-xs sm:text-sm md:text-base lg:text-lg py-1 sm:py-2 md:py-3 lg:py-4"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start mt-2 sm:mt-3 md:mt-4 lg:mt-5 relative">
          <label
            htmlFor="country"
            className="text-white w-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
          >
            Country :
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            className="w-full rounded-lg px-1 sm:px-2 md:px-3 lg:px-4 font-semibold outline-0 border-0 text-blue-800 text-xs sm:text-sm md:text-base lg:text-lg py-1 sm:py-2 md:py-3 lg:py-4"
          />
          <ReactCountryFlag
            svg
            countryCode={countryCode}
            className=" absolute right-1 bottom-1 "
          />
        </div>
        <div className="w-full flex justify-between items-center mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <button
            className="bg-slate-200 px-2 sm:px-3 md:px-4 lg:px-5 rounded-lg my-2 sm:my-3 md:my-4 lg:my-5 font-bold  sm:py-1 md:py-2 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="bg-blue-600 text-white px-2 sm:px-3 md:px-4 lg:px-5 rounded-lg my-2 sm:my-3 md:my-4 lg:my-5 font-bold  sm:py-1 md:py-2 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
