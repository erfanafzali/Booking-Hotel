import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="w-full pr-3 mb-4">
      <div className="w-full bg-blue-600 justify-center flex flex-col gap-y-2  p-3 sm:gap-y-3 md:gap-y-4 lg:gap-y-5 rounded-xl   items-center  mt-10 sm:mt-12 md:mt-14 lg:mt-16">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg  font-bold w-full text-center text-white">
          {currentHotel.name}
        </h2>
        <img
          className="rounded-lg border-2 border-white"
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
        <div className="text-xs sm:text-sm md:text-base lg:text-lg w-full text-blue-200">
          {currentHotel.numeber_of_reviews} reviews &bull;
          {currentHotel.smart_location}
          {currentHotel.description}
        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
