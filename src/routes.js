import { Routes, Route } from "react-router-dom";
import Blogs from "./Components/Blogs";
import Home from "./Components/Home";
import Works from "./Components/Works";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/blogs" element={<Blogs />} />
      <Route exact path="/blogs/:id" element={<h1>Blog id</h1>} />
      <Route exact path="/works" element={<Works />} />
    </Routes>
  );
};

export default AppRoutes;
