import React from "react";
import { fetchGIF, fetchImage, fetchVideo } from "./api/mediaApi";
import SearchBar from "./components/SearchBar.jsx";
import Tabs from "./components/Tabs.jsx";
import ResultGrid from "./components/ResultGrid.jsx";

const App = () => {
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white p-4">
      <SearchBar />
      <Tabs />
      <ResultGrid />
    </div>
  );
};

export default App;
