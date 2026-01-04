import React, { useEffect } from "react";
import { fetchGIF, fetchImage, fetchVideo } from "../api/mediaApi";
import {
  setResults,
  setLoading,
  setError,
} from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search
  );

  useEffect(() => {
    if (!query.trim()) return;

    const getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];
        let response;

        if (activeTab === "photos") {
          response = await fetchImage(query);
          if (!Array.isArray(response)) return;
          data = response.map((item) => ({
            id: item.id,
            type: "photo",
            src: item.urls.full,
          }));
          console.log(data);
        }

        if (activeTab === "gifs") {
          response = await fetchGIF(query);
          if (!Array.isArray(response)) return;
          data = response.map((item) => ({
            id: item.id,
            type: "gif",
            src: item.media_formats.gif.url,
          }));
          console.log(data);
        }

        if (activeTab === "videos") {
          response = await fetchVideo(query);
          if (!Array.isArray(response)) return;

          data = response.map((item) => ({
            id: item.id,
            type: "video",
            src: item.video_files[0].link,
          }));
        }

        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    getData();
  }, [query, activeTab, dispatch]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="flex justify-between w-full flex-wrap gap-6 overflow-auto px-10">
      {results.map((item) => (
        <div key={item.id}>
          <ResultCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ResultGrid;
