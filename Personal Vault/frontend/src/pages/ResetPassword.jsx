import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../utils/api"; // import axios instance

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/reset-password/${token}`, { password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  );
}
