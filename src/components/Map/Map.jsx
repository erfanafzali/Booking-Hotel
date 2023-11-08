import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

import { useHotels } from "../context/HotelsProvider";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([50, 4]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && GeolocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 leaflet-control mb-10">
      <MapContainer
        className="w-[100%]  h-screen rounded-xl "
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        doubleClickZoom={true}
      >
        <button
          onClick={getPosition}
          className="absolute bg-blue-600 bottom-0 lg:h-10  h-8  w-full right-0 border-t-2 border-white font-bplt text-white text-xs sm:text-sm md:text-base lg:text-lg hover:bg-blue-700 "
        >
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeCenter position={mapCenter} />

        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
