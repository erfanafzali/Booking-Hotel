import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmarks, isLoading, currentBookmarks } = useBookmark();

  useEffect(() => {
    getBookmarks(id);
  }, [id]);

  if (isLoading || !currentBookmarks) return <Loader />; 
  return (
    <div className="w-full lg:pr-10 md:pr-8 sm:pr-6 pr-4 mt-10 sm:mt-12 md:mt-14 lg:mt-16 leaflet-control mb-10">
      <button
        className="bg-slate-200 px-2 sm:px-3 md:px-4 lg:px-5 rounded-lg my-2 sm:my-3 md:my-4 lg:my-5 font-bold  sm:py-1 md:py-2 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <div className=" w-full   bg-slate-200 rounded-xl ">
        <div className=" w-full  px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5">
          <div className="flex items-center w-full h-auto gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 bg-slate-200 px-1 sm:px-2 md:px-3 lg:px-4   rounded-xl">
            <ReactCountryFlag
              svg
              countryCode={currentBookmarks.countryCode}
              style={{
                width: "1.4em",
                height: "1.4em",
              }}
            />
            <div className="w-full">
              <span className="pr-1 sm:pr-2 md:pr-3 lg:pr-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold ">
                {currentBookmarks.country}
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {currentBookmarks.cityName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
