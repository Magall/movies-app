import { Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Home from "./views/Home";
import SearchResult from "./views/SearchResult";
import { useAppSelector } from "./app/hooks";

export default function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<SearchResult />} />
    </Routes>
  );
}

