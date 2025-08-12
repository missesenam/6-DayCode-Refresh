import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({
  onSubmit,
  title,
  linkPromptText,
  linkText,
  linkHref,
  passPromptText,
  pageRef,
  pageText,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") return;
    if (password === "") return;
    onSubmit({ email, password });
    // setEmail("");
    // setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow w-full max-w-md mx-auto mt-12 text-white"
    >
      <h2 className="text-2xl mb-4">{title}</h2>
      <input
        className="w-full mb-3 p-2 bg-gray-700 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-4 p-2 bg-gray-700 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full mb-4">
        {title}
      </button>
      <p className="text-sm text-gray-400 mt-4 text-center">
        {passPromptText}{" "}
        <Link
          to={pageRef}
          className="text-blue-400 hover:underline hover:text-blue-300 font-medium"
        >
          {pageText}
        </Link>
      </p>

      {linkPromptText && linkText && linkHref && (
        <p className="text-sm text-gray-300 text-center">
          {linkPromptText}{" "}
          <Link
            to={linkHref}
            className="text-green-400 hover:text-green-500 font-semibold underline ml-1"
          >
            {linkText}
          </Link>
        </p>
      )}
    </form>
  );
}
