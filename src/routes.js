import { Routes, Route } from "react-router-dom";
import Blogs from "./Components/Blogs";
import Home from "./Components/Home";
import Works from "./Components/Works";

export const ROUTEPATHS = {
  HOME: "/",
  BLOGS: "/blogs",
  BLOG: "/blogs/:id",
  WORKS: "/works",
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path={ROUTEPATHS.HOME} element={<Home />} />
      <Route exact path={ROUTEPATHS.BLOGS} element={<Blogs />} />
      <Route exact path={ROUTEPATHS.BLOG} element={<h1>Blog id</h1>} />
      <Route exact path={ROUTEPATHS.WORKS} element={<Works />} />
    </Routes>
  );
};

export default AppRoutes;
