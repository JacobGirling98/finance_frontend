import React from "react";

const DatePicker = () => {
  return (
    <>
      <label htmlFor="date" className="text-white mb-1 ml-2">
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        className="rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none"
      />
    </>
  );
};

export default DatePicker;
