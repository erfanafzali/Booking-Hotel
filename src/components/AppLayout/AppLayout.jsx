import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div className="w-full flex flex-col md:flex-row md:flex justify-between items-center">
      <div className="w-full">
        <Outlet />
      </div> 
      <div className="w-full">map</div>
    </div>
  );
}

export default AppLayout;
