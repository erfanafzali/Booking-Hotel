import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";

function Hotels() {
  const { isLoading, hotels } = useHotels();

  if (isLoading) <Loader />;

  return (
    <div className="w-full flex flex-col justify-center items-start">
      <h2 className="w-full mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold text-blue-100 mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
        Search Resoults ({hotels.length})
      </h2>
      {hotels.map((item) => {
        return (
          <Link
            className="w-[50%] md:w-[95%] sm:px-2 md:px-4" 
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude} `}
          >
            <div className="flex flex-col justify-center items-center bg-blue-600 rounded-xl mb-3 md:mb-4 lg:mb-6 shadow-md shadow-blue-600 sm:flex-row w-full">
              <img
                className="sm:w-[40%] w-full h-28 md:h-36 rounded-xl object-cover md:w-[50%]"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="flex flex-col w-[100%] md:w-[60%] px-2  items-center justify-center pt-2 sm:pt-0 text-[10px] sm:text-[13px] md:text-[14px] lg:text-[18px]">
                <p className="font-bold text-blue-50 whitespace-nowrap">
                  {item.smart_location}
                </p>
                <p
                  className="font-semibold text-blue-200 md:hidden w-[90%] text-center text-[8px] sm:text-[11px] md:text-[12px] lg:text-[16px]"
                  title={item.name}
                >
                  {String(item.name).slice(0, 25)}...
                </p>
                <p
                  className="font-semibold text-blue-200 md:flex hidden w-[90%] text-center text-[8px] sm:text-[11px] md:text-[12px] lg:text-[16px]"
                  title={item.name}
                >
                  {item.name}
                </p>
                <div className="flex justify-center items-center pt-3  mb-3 sm:mb-0">
                  <p className="font-bold text-blue-100">€{item.price}&nbsp;</p>
                  <span className="font-semibold text-blue-200 ">night</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
