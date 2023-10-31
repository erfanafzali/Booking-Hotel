import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `
  q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <Loader />;

  return (
    <div className="w-full flex flex-col justify-center items-start">
      <h2 className="w-full mt-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold text-blue-100 mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
        Search Resoults ({data.length})
      </h2>
      {data.map((item) => {
        return (
          <Link
            className="w-[50%] md:w-full"
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude} `}
          >
            <div className="flex flex-col justify-center items-center bg-blue-600 rounded-xl mb-3 md:mb-4 lg:mb-6 shadow-md shadow-blue-600 sm:flex-row w-full">
              <img
                className="sm:w-[40%] w-full h-28 md:h-36 rounded-xl object-cover md:w-[50%]"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="flex flex-col text-[10px] w-[100%] md:w-[60%] px-2  items-center justify-center ">
                <p className="font-bold text-blue-50">{item.smart_location}</p>
                <p
                  className="font-semibold text-blue-200 sm:hidden"
                  title={item.name}
                >
                  {String(item.name).slice(0, 25)}...
                </p>
                <p
                  className="font-semibold text-blue-200 sm:flex hidden"
                  title={item.name}
                >
                  {item.name}
                </p>
                <div className="flex justify-center items-center  mb-3 sm:mb-0">
                  <p className="font-bold text-blue-100">€{item.price}&nbsp;</p>
                  <span className="font-semibold text-blue-200">night</span>
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
