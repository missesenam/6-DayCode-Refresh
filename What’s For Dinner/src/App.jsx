import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WhatsForDinner from "./pages/WhatsForDinner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WhatsForDinner />} />
      </Routes>
    </Router>
  );
};

export default App;
