import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQueryValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(query));
    setQueryValue("");
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={submitHandler} className="flex w-full max-w-xl">
        <input
          value={query}
          onChange={(e) => setQueryValue(e.target.value)}
          type="text"
          placeholder="Search anything..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-r-xl">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
