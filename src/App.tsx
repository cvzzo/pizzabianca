import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Gallery from "./Gallery";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}
