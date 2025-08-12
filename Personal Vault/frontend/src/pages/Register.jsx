import AuthForm from "../components/AuthForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async ({ email, password }) => {
    try {
      const res = await api.post("/signup", { email, password });
      console.log("✅ Registered:", res.data.user);

      navigate("/"); // or login page
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data?.errors || error.message
      );
      alert(error.response?.data?.message || "Registration error");
    }
  };
  return (
    <div>
      <AuthForm
        onSubmit={handleRegister}
        title="Register"
        linkPromptText="already have an account?"
        linkText="login here"
        linkHref="/login"
      />
    </div>
  );
};

export default Register;
