import { useSelector } from "react-redux";
import ResultCard from "../components/ResultCard";

const Collections = () => {
  const collection = useSelector((state) => state.collection.items);

  if (collection.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-20">No items saved yet</p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>

      <div className="flex flex-wrap gap-3 ">
        {collection.map((item) => (
          <ResultCard key={item.id} item={item} isCollection />
        ))}
      </div>
    </div>
  );
};

export default Collections;
