import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "gifs", "videos", "all"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-3 my-6 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => dispatch(setActiveTabs(tab))}
          className={`
            px-5 py-1.5 rounded-full text-xs font-semibold uppercase
            transition-all duration-200
            ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
