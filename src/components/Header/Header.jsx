/* eslint-disable react/prop-types */
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "./Modal";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]:
          operation === "inc"
            ? option[name] + 1
            : operation === "dec"
              ? option[name] - 1
              : [name],
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      option: JSON.stringify(option),
    });
    //note : => setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <header className="w-full h-auto flex justify-around items-center py-4 newbgcolor lg:mt-8 md:mt-6 mt-4 rounded-lg shadow-lg shadow-blue-700 ">
      <div className="flex justify-between items-center w-full h-auto px-2 py-2">
        <Login />
        <SortHeader
          destination={destination}
          setDestination={setDestination}
          setOpenOption={setOpenOption}
          openOption={openOption}
          option={option}
          setOption={setOption}
          handleOptions={handleOptions}
          openDate={openDate}
          setOpenDate={setOpenDate}
          date={date}
          setDate={setDate}
          handleSearch={handleSearch}
        />
        <BookMark />
        <ModalBtn
          open={open}
          setOpen={setOpen}
          option={option}
          setOption={setOption}
          handleOptions={handleOptions}
        />
      </div>
    </header>
  );
}

export default Header;

function ModalBtn({ open, setOpen }) {
  return (
    <div className=" md:hidden w-full flex justify-center items-center">
      <Modal open={open} setOpen={setOpen} title="Sort" />
      <button className="w-6">
        <AdjustmentsHorizontalIcon
          className="text-blue-200"
          onClick={() => setOpen((open) => !open)}
        />
      </button>
    </div>
  );
}

function BookMark() {
  return (
    <div className="w-full md:w-[18%] flex justify-center items-center">
      <Link
        to="/bookmarks"
        className="font-bold text-blue-100 flex justify-center items-center"
      >
        <span>
          <BookmarkIcon className="w-4 sm:w-5  lg:w-9 text-blue-300" />
        </span>
        <span className="text-blue-300 text-sm  md:text-base lg:text-xl">
          Bookmarks
        </span>
      </Link>
    </div>
  );
}

function Login() {
  const navigate = useNavigate()
  const { user, isAuthentiacted, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="w-full md:w-[7%] flex justify-center items-center font-bold pr-4">
      {
        isAuthentiacted ? <div className="flex flex-col justify-center items-center">

          <span>
            <ArrowLeftOnRectangleIcon onClick={handleLogout} className="w-5 sm:w-6 md:w-7 lg:w-9 font-bold text-blue-600" />
          </span>
          <span className=" text-xs sm:text-sm md:text-base lg:text-lg text-green-600">
            {user.name}
          </span>
        </div> : <Link to="/login" className="flex flex-col justify-center items-center">
          <span>
            <ArrowRightOnRectangleIcon className="w-5 sm:w-6 md:w-7 lg:w-9 font-bold text-blue-600" />
          </span>
          <span className="text-blue-600  text-xs sm:text-sm md:text-base lg:text-lg">
            Login
          </span>
        </Link>
      }
    </div>
  );
}

function SortHeader({
  destination,
  setDestination,
  setOpenOption,
  openOption,
  option,
  handleOptions,
  openDate,
  setOpenDate,
  date,
  setDate,
  handleSearch,
}) {
  return (
    <div className="hidden md:flex w-[80%] justify-center items-center ">
      <div className="w-full flex justify-center items-center gap-x-3">
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          className="w-[22%] flex justify-center items-center md:text-sm lg:text-base ml-2 bg-blue-400 rounded-lg outline-0 border-0 px-2 py-1.5 text-white font-semibold placeholder:text-blue-300"
          placeholder="Where to go ?"
          name="destination"
          id="destination"
        />
        <div
          onClick={() => setOpenDate(!openDate)}
          className="w-[30%] flex justify-between items-center bg-blue-400 rounded-lg px-2 md:px-1 lg:px-2 text-blue-100 py-0.5"
        >
          <span className="w-[23%]">
            <CalendarDaysIcon className="lg:w-8 md:w-4 " />
          </span>
          <div className="w-[80%] lg:text-sm  md:text-[10px] md:py-1.5 font-semibold whitespace-nowrap">{`${format(
            date[0].startDate,
            "MM/dd/yyyy"
          )} => ${format(date[0].endDate, "MM/dd/yyyy")}`}</div>
        </div>

        {openDate && (
          <DateRange
            id="DateRangeDropDown"
            ranges={date}
            className="absolute top-[17%] lg:left-[28%]  md:left-[21%] bg-blue-100 "
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
            closeOnSelect={true}
            isClearable={true}
          />
        )}

        <div
          id="optionDropDown"
          onClick={() => setOpenOption(!openOption)}
          className="w-[35%] flex justify-around items-center rounded-lg bg-blue-400  outline-0 border-0 px-4 py-1 text-blue-200 font-semibold p-1 lg:text-base md:text-sm"
        >
          <span className="md:text-sm lg:text-base whitespace-nowrap">
            adult:{option.adult}&nbsp;
          </span>
          <span className="md:text-sm lg:text-base whitespace-nowrap">
            children:{option.children}&nbsp;
          </span>
          <span className="md:text-sm lg:text-base whitespace-nowrap">
            room:{option.room}&nbsp;
          </span>
        </div>
        {openOption && (
          <GuestOption
            option={option}
            handleOptions={handleOptions}
            setOpenOption={setOpenOption}
          />
        )}

        <div className="w-[6%] flex justify-center items-center ">
          <button
            onClick={handleSearch}
            className="flex justify-between items-center  text-blue-200 lg:px-3 py-1  rounded-xl"
          >
            <MagnifyingGlassIcon className="w-9 p-2 rounded-full text-blue-100  bg-blue-700 " />
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestOption({ option, handleOptions, setOpenOption }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div
      ref={optionsRef}
      className="absolute lg:w-[22%] lg:right-[25%] md:right-[27%] md:w-[20%] bg-blue-200 shadow-blue-400 gap-y-1 rounded-lg lg:top-28 md:top-[97px] h-auto z-10 text-blue-700 flex flex-col justify-center items-center"
    >
      <GuestOptionItem
        type="adult"
        option={option}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <GuestOptionItem
        type="children"
        option={option}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <GuestOptionItem
        type="room"
        option={option}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function GuestOptionItem({ type, option, minLimit, handleOptions }) {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="w-[20%] lg:text-base md:text-xs">{type}</div>
      <button
        onClick={() => handleOptions(type, "dec")}
        disabled={option[type] <= minLimit}
      >
        <MinusIcon className="w-5 bg-blue-700 text-white rounded-full" />
      </button>
      <span>{option[type]}</span>
      <button onClick={() => handleOptions(type, "inc")}>
        <PlusIcon className="w-5 bg-blue-700 text-white rounded-full" />
      </button>
    </div>
  );
}
