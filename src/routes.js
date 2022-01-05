import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/blogs" element={<h1>Blogs</h1>} />
      <Route exact path="/blogs/:id" element={<h1>Blog</h1>} />
    </Routes>
  );
};

export default AppRoutes;
