import React from "react";
import { fetchImage } from "./api/mediaApi";

const App = () => {
  return (
    <>
      <div className="bg-gray-900 w-full min-h-screen text-white ">
        <button
          onClick={async () => {
            const data = await fetchImage("cat");
            console.log(data);
          }}
        >
          click me
        </button>
      </div>
    </>
  );
};

export default App;
