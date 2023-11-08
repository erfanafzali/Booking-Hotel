import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
function AppLayout() {
  return (
    <div className="w-full flex h-auto justify-center items-start gap-x-2 appLayout z-10">
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full">
        <Map />
      </div>
    </div>
  );
}

export default AppLayout;
