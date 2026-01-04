import React from "react";

const ResultCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="w-[18vw] relative rounded-xl overflow-hidden">
      {(item.type === "photo" || item.type === "gif") && (
        <img src={item.src} alt="media" className="w-full h-64 object-cover" />
      )}

      {item.type === "video" && (
        <video
          autoPlay
          loop
          muted
          src={item.src}
          controls
          className="w-full h-64 object-cover"
        />
      )}
    </div>
  );
};

export default ResultCard;
