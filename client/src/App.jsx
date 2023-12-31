import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./index.css";

// Lazy-loaded components

// const OAuth = lazy(() => import("./pages/OAuth"));
const PrivateRoute = lazy(() => import("./components/PrivateRoutes"));
const Home = lazy(() => import("./pages/Home"));
// const Profile = lazy(() => import("./pages/Profile"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const OnePercent = lazy(() => import("./pages/OnePercent"));
// const PostPage = lazy(() => import("./pages/PostPage"));
// const Friends = lazy(() => import("./pages/Friends"));

function App() {
  return (
    <main className="flex h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/create-post"
            element={
              <Suspense>
                <CreatePost />
              </Suspense>
            }
          />
          <Route
            path="/one"
            element={
              <Suspense>
                <OnePercent />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense>
                <PrivateRoute />
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

// <Route
//   path="/post/:id"
//   element={
//     <Suspense>
//       <PostPage />
//     </Suspense>
//   }/>

// <Route
//     path="/friends/:id"
//     element={
//       <Suspense>
//         <Friends />
//       </Suspense>
//     }
//   />

//    <Route
//     path="/profile/:id"
//     element={
//       <Suspense>
//         <Profile />
//       </Suspense>
//     }
//   />

//   <Route
//   path="/oauth"
//   element={
//     <Suspense>
//       <OAuth />
//     </Suspense>
//   }
// />
