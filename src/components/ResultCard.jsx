import { useDispatch, useSelector } from "react-redux";
import {
  addToCollection,
  removeFromCollection,
} from "../redux/features/collectionSlice";
import toast from "react-hot-toast";
const ResultCard = ({ item, isCollection = false }) => {
  if (!item) return null;
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection.items);
  const isSaved = collection.some((i) => i.id === item.id);
  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCollection) {
      dispatch(removeFromCollection(item.id));
      toast.success("Item deleted successfully!");
    } else {
      const exists = collection.find((i) => i.id === item.id);

      if (exists) {
        toast("Already saved");
        return;
      }

      dispatch(addToCollection(item));
      toast.success("Saved to collection");
    }
  };

  return (
    <div className="w-[18vw] relative rounded-xl overflow-hidden group">
      <a href={item.link} target="_blank" rel="noreferrer">
        {(item.type === "photo" || item.type === "gif") && (
          <>
            <img
              src={item.src}
              loading="lazy"
              alt="media"
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {item.title}
            </p>
          </>
        )}

        {item.type === "video" && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              src={item.src}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Author: <i>{item.title}</i>
            </p>
          </>
        )}
      </a>
      {isCollection ? (
        <button
          onClick={handleAction}
          className="absolute top-3 right-3 z-20 flex items-center gap-1
                     bg-red-500/90 hover:bg-red-500
                     text-white text-xs px-3 py-1.5
                     rounded-full font-semibold
                     shadow-md hover:shadow-lg
                     opacity-0 group-hover:opacity-100
                     transition-all active:scale-90"
        >
          🗑 Delete
        </button>
      ) : isSaved ? (
        <button
          disabled
          className="absolute top-3 right-3 z-20 flex items-center gap-1
                     bg-green-500/90
                     text-white text-xs px-3 py-1.5
                     rounded-full font-semibold
                     shadow-md
                     cursor-not-allowed"
        >
          Saved
        </button>
      ) : (
        <button
          onClick={handleAction}
          className="absolute top-3 right-3 z-20 flex items-center gap-1
                     bg-white/90 hover:bg-white
                     text-black text-xs px-3 py-1.5
                     rounded-full font-semibold
                     shadow-md hover:shadow-lg
                     opacity-0 group-hover:opacity-100
                     transition-all active:scale-90"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default ResultCard;
