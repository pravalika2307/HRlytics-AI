import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Analytics from "./pages/Analytics";
import Sidebar from "./components/Sidebar";
import Advisor from "./pages/Advisor";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >
      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/advisor" element={<Advisor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
