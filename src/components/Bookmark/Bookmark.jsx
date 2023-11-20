import { TrashIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmarks, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return (
      <p className="w-full text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-10 sm:mt-12 md:mt-14 lg:mt-16">
        There is no bookmark Location
      </p>
    );

  return (
    <div className="w-full flex flex-col justify-center items-start mt-10 sm:mt-12 md:mt-14 lg:mt-16 leaflet-control mb-10">
      <h2 className="w-full text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 ">
        Bookmark List
      </h2>

      <div className="w-full flex flex-col justify-center items-start gap-y-4 sm:gap-y-5 md:gap-y-6 lg:gap-y-7 xl:gap-y-8  lg:pr-20 md:pr-16 ">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className="bg-slate-200 w-full rounded-xl px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5"
            >
              <div
                className={`flex items-center w-full h-auto gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 bg-slate-200 px-1 sm:px-2 md:px-3 lg:px-4   rounded-xl ${
                  item.id === currentBookmarks?.id ? "current-bookmarks" : ""
                }`}
              >
                <div className="w-full flex justify-between items-center h-auto  ">
                  <ReactCountryFlag
                    svg
                    countryCode={item.countryCode}
                    style={{
                      width: "1.3em",
                      height: "1.3em",
                    }}
                  />
                  <div className="w-full flex justify-start items-center pl-1 sm:pl-2 md:pl-3 lg:pl-4">
                    <span className="pr-1 sm:pr-2 md:pr-3 lg:pr-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold ">
                      <span className="flex sm:hidden">
                        {String(item.country).slice(0, 4)}...
                      </span>
                      <span className="hidden sm:flex lg:hidden">
                        {String(item.country).slice(0, 7)}...
                      </span>
                      <span className="hidden lg:flex">
                        {String(item.country).slice(0, 100)}
                      </span>
                    </span>
                    <span
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                      title={item.cityName}
                    >
                      <span className="flex sm:hidden">
                        {String(item.cityName).slice(0, 4)}...
                      </span>
                      <span className="hidden sm:flex lg:hidden">
                        {String(item.cityName).slice(0, 7)}...
                      </span>
                      <span className="hidden lg:flex">
                        {String(item.cityName).slice(0, 100)}
                      </span>
                    </span>
                  </div>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    <TrashIcon className="w-4 sm:w-5 md:w-6 lg:w-7 xl:w-8 text-red-600" />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmark;
