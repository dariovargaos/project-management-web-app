import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RootLayout from "./layouts/RootLayout";
import Home from "./layouts/Home";
import LoginSignupLayout from "./layouts/LoginSignupLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  const { user, authIsReady } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="dashboard" />}
        />
        <Route element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="create"
            element={user ? <Create /> : <Navigate to="/" />}
          />
          <Route
            path="projects/:id"
            element={user ? <Project /> : <Navigate to="/" />}
          />
          <Route
            path="user/:id"
            element={user ? <UserProfile /> : <Navigate to="/" />}
          />
        </Route>

        <Route element={<LoginSignupLayout />}>
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Route>
      </Route>
    )
  );
  return authIsReady && <RouterProvider router={router} />;
}

export default App;
