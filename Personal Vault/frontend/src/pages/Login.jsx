// src/pages/Login.jsx or LoginPage.jsx
import AuthForm from "../components/AuthForm";
import api from "../utils/api"; // import axios instance
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await api.post("/signin", { email, password });
      console.log("✅ Login successful", res.data);
      navigate("/");
    } catch (error) {
      console.error(
        "❌ Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login error");
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      title="Login"
      linkPromptText="don't have an account yet?"
      linkText="regiter here"
      linkHref="/register"
      passPromptText="forgot your password?"
      pageRef="/forpass"
      pageText="Reset it here"
    />
  );
}
