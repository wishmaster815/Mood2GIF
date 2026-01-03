import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "gifs", "videos"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  return (
    <div>
      {tabs.map((elem, idx) => (
        <button
          onClick={() => {
            dispatch(setActiveTabs(elem));
          }}
          key={idx}
          className={`${
            activeTab == elem
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-red-600 hover:bg-red-500"
          }  p-4 m-1 `}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
