import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import OAuth from "./pages/OAuth";
import PrivateRoute from "./components/PrivateRoutes";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Friends from "./pages/Friends";

function App() {
  return (
    <main className="flex h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/oauth" element={<OAuth />} />
          {/*  */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/friends/:id" element={<Friends />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
