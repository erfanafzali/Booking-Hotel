/* eslint-disable react/prop-types */
import {
  CalendarDaysIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Modal({ open, setOpen, title }) {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
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

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]:
          operation === "inc"
            ? option[name] + 1
            : operation === "dec"
              ? option[name] - 1
              : [],
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
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className="w-screen h-screen fixed inset-0 backdrop-blur-sm "
      ></div>
      <div className="absolute gap-y-1 sm:gap-y-2 md:gap-y-3 top-[20%] sm:top-[26%] bg-blue-300 left-[20%] px-3 py-3 w-[60%] rounded-xl p-1 sm:p-2 md:p-3 lg:p-4 shadow-blue-400 flex flex-col justify-center z-30">
        <div className="flex justify-between  rounded-xl w-full mb-3 z-40">
          <h1 className="text-base text-blue-600 font-bold">{title}</h1>
          <button onClick={() => setOpen(false)}>
            <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6  text-red-500" />
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-between items-center text-xs  w-full gap-y-2 flex-col ">
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              className="w-full rounded-lg bg-blue-400 py-1 outline-0 border-0 px-2 sm:text-base placeholder:text-blue-300 text-white font-medium"
              placeholder="Where to go ?"
              id="destination"
              name="destinationModal"
            />
            <div
              onClick={() => setOpenDate(!openDate)}
              className="w-[100%] flex justify-between items-center bg-blue-400 rounded-lg px-2 text-blue-200 py-0.5"
            >
              <span>
                <CalendarDaysIcon className="w-6 sm:w-8" />
              </span>
              <div className="font-bold text-[10px] sm:text-base">{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} => ${format(date[0].endDate, "MM/dd/yyyy")}`}</div>
            </div>

            {openDate && (
              <DateRange
                ranges={date}
                className="absolute top-[60%] lg:left-[29%]  md:left-[21%] bg-blue-100 "
                id="DateRangeDropDown"
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
                closeOnSelect={true}
                isClearable={true}
              />
            )}
          </div>
          <div className="w-full">
            <div
              id="optionDropDown"
              onClick={() => setOpenOption(!openOption)}
              className="flex justify-between items-center text-[11px] sm:text-base mt-3 w-full rounded-lg  bg-blue-400 py-1 outline-0 border-0 px-2 text-blue-300 cursor-pointer "
            >
              <span>
                <span>adult: {option.adult}</span>
              </span>
              <span>
                <span>children: {option.children}</span>
              </span>
              <span>
                <span>room: {option.room}</span>
              </span>
            </div>
            {openOption && (
              <GuestOptionModal
                option={option}
                handleOption={handleOption}
                setOpenOption={setOpenOption}
              />
            )}
            <div className="w-full flex justify-center items-center ">
              <button
                onClick={handleSearch}
                className="py-1.5 px-3 bg-blue-400 flex justify-center items-center rounded-xl mt-4 font-bold text-sm text-white"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

function GuestOptionModal({ option, handleOption, setOpenOption }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div
      ref={optionsRef}
      className="absolute w-[80%] sm:left-10 left-6 bg-blue-200 shadow-blue-400 rounded-lg lg:top-20  h-auto z-10 text-blue-700 flex flex-col justify-center items-center"
    >
      <GuestOptionItemModal
        option={option}
        type="adult"
        minLimit={1}
        handleOption={handleOption}
      />
      <GuestOptionItemModal
        option={option}
        type="children"
        minLimit={0}
        handleOption={handleOption}
      />
      <GuestOptionItemModal
        option={option}
        type="room"
        minLimit={1}
        handleOption={handleOption}
      />
    </div>
  );
}

function GuestOptionItemModal({ option, type, minLimit, handleOption }) {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="w-[20%] text-sm sm:text-md">{type}</div>
      <button
        onClick={() => handleOption(type, "dec")}
        disabled={option[type] <= minLimit}
      >
        <MinusIcon className="w-3 bg-blue-700 text-white rounded-full" />
      </button>
      <span>{option[type]}</span>
      <button onClick={() => handleOption(type, "inc")}>
        <PlusIcon className="w-3 bg-blue-700 text-white rounded-full" />
      </button>
    </div>
  );
}
