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
        if (activeTab === "all") {
          const [photos, gifs, videos] = await Promise.all([
            fetchImage(query),
            fetchGIF(query),
            fetchVideo(query),
          ]);

          const photoData = Array.isArray(photos)
            ? photos.map((item) => ({
                id: `photo-${item.id}`,
                type: "photo",
                title: item.alt_description,
                src: item.urls.small,
                link: item.links.html,
              }))
            : [];

          const gifData = Array.isArray(gifs)
            ? gifs.map((item) => ({
                id: `gif-${item.id}`,
                type: "gif",
                title: "GIF",
                src: item.media_formats.gif.url,
              }))
            : [];

          const videoData = Array.isArray(videos)
            ? videos.map((item) => ({
                id: `video-${item.id}`,
                type: "video",
                title: item.user.name,
                src: item.video_files[0].link,
              }))
            : [];

          data = [...photoData, ...gifData, ...videoData];
        }

        if (activeTab === "photos") {
          response = await fetchImage(query);
          if (!Array.isArray(response)) return;
          data = response.map((item) => ({
            id: item.id,
            title: item.alt_description,
            type: "photo",
            src: item.urls.regular,
            link: item.links.html,
          }));
        }

        if (activeTab === "gifs") {
          response = await fetchGIF(query);
          if (!Array.isArray(response)) return;
          data = response.map((item) => ({
            id: item.id,
            type: "gif",
            title: "GIF",
            src: item.media_formats.gif.url,
          }));
        }

        if (activeTab === "videos") {
          response = await fetchVideo(query);
          if (!Array.isArray(response)) return;

          data = response.map((item) => ({
            id: item.id,
            type: "video",
            src: item.video_files[0].link,
            title: item.user.name,
            link:item.url
          }));
          console.log(data);
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
    <div className="flex justify-between w-full flex-wrap gap-3 overflow-auto ">
      {results.map((item) => (
        <div key={item.id}>
          <ResultCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ResultGrid;
