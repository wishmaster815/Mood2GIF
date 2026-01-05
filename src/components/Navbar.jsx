import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/">
        <h1 className="font-bold text-2xl">Mood2GIF</h1>
      </Link>

      <Link
        to="/collections"
        className="bg-linear-to-tr from-green-500 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg"
      >
        Collections
      </Link>
    </div>
  );
};

export default Navbar;
