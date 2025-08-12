import { useState } from "react";
import axios from "axios";
import api from "../utils/api"; // import axios instance

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
      <p className="mb-4">Don't worry, it happens to the strongest of us 💪</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  );
}
