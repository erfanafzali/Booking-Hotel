import { Outlet } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Map from "../Map/Map";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="w-full flex h-auto justify-center items-start gap-x-2 appLayout z-10">
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
