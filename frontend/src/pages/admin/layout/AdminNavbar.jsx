 
const Navbar = () => {
  return (
    <div className="w-full bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-semibold">Welcome, Admin</div>
      <div className="flex items-center space-x-4">
        <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">Notifications</button>
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
