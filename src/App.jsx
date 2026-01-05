import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Tabs from "./components/Tabs.jsx";
import ResultGrid from "./components/ResultGrid.jsx";
import Collections from "./pages/Collections.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white p-4">
      <Toaster position="top-center" />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <Tabs />
              <ResultGrid />
            </>
          }
        />

        <Route path="/collections" element={<Collections />} />
      </Routes>
    </div>
  );
};

export default App;
