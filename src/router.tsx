import { Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Home from "./views/Home";
import SearchResult from "./views/SearchResult";
import { MovieOrTvDetail } from "./views/MotionDetail";

export default function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<SearchResult />} />
        <Route path="/:mediaType/:motionId" element={<MovieOrTvDetail/>}/>

    </Routes>
  );
}

