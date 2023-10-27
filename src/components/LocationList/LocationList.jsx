import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) <p>Loading...</p>;
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="w-full h-auto p-1 font-bold text-sm sm:text-base md:text-lg lg:text-xl md:mt-4 mt-3  flex justify-around text-blue-200">
        <h2 className="">Nearby Location</h2>
        <h2>Hotels</h2>
      </div>
      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center w-full h-auto p-4  gap-8">
        {data.map((item) => {
          return (
            <div
              className=" w-full md:my-4 rounded-lg shadow-blue-500 shadow-md h-full"
              key={item.id}
            >
              <img
                className="object-cover overflow-hidden w-full max-h-44 rounded-t-lg h-auto"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="w-full bg-blue-700 h-[40%] flex flex-col justify-center items-start">
                <p className="text-white font-bold w-full text-center pt-2 text-base md:text-lg">
                  {item.smart_location}
                </p>
                <p className="text-blue-200 text-xs sm:text-sm md:text-sm  whitespace-nowrap w-full text-center">
                  {item.name}
                </p>
                <div className="w-full flex justify-center items-center font-semibold text-blue-200 py-1 text-sm sm:text-md md:text-lg lg:text-xl">
                  <p>€ &nbsp;{item.price}&nbsp;</p>
                  <span>night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
