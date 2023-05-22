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

function App() {
  const { user, authIsReady } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={user ? <Dashboard /> : <Navigate to="login" />} />
        <Route
          path="create"
          element={user ? <Create /> : <Navigate to="/login" />}
        />
        <Route
          path="projects/:id"
          element={user ? <Project /> : <Navigate to="/login" />}
        />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Route>
    )
  );
  return authIsReady && <RouterProvider router={router} />;
}

export default App;
