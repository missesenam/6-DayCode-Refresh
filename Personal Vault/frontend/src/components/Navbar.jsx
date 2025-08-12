import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  localStorage.removeItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.post("/signout", {}, { withCredentials: true });
      window.location.href = "/login";
      // navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">🔒 Vault</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
