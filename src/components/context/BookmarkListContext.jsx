import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmarks: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
    case "bookmark/created":
    case "bookmark/deleted":
    case "rejected":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

// 1.pending , 2.success, 3.rejected

function BookmarkListProvider({ children }) {
  // const [currentBookmarks, setCurrentBookmarks] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [{ bookmarks, isLoading, currentBookmarks }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmarks(id) {
    dispatch({ type: "loading" });
    // setIsLoading(true);
    setCurrentBookmarks(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmarks / loaded", payload: data });
      // setCurrentBookmarks(data);
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in loading bookmarks",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    // setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmarks(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    // setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmarks,
        currentBookmarks,
        createBookmark,
        deleteBookmark,
      }}
    >
      <div className="container mx-auto w-full px-4">{children}</div>
    </BookmarkContext.Provider>
  );
}
export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
