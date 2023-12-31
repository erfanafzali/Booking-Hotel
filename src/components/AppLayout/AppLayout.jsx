import { Outlet } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Map from "../Map/Map";
function AppLayout() {
  
  const { hotels } = useHotels();

  return (
    <div className="w-full flex h-auto justify-center items-start gap-x-2 appLayout z-10">
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;
