
import React from "react";
import { Routes, Route } from "react-router-dom";

import StartPage from "./components/StartPage";
import Main from "./components/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/documentation" element={<Main />} />
    </Routes>
  );
}

export default App;
