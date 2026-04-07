const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-green-700 text-white px-4 py-3 flex items-center justify-between shadow-md">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        <div className="text-lg md:text-2xl font-semibold">
          Admin
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">
        
        <button className="bg-green-600 px-2 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-green-500 transition">
          🔔
        </button>

        <button className="bg-red-500 px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-red-400 transition">
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;