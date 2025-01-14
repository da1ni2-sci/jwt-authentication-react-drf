import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/useAuth";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./routes/Login";
import Menu from "./routes/Menu";
import Register from "./routes/Register";

const AppLayout = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <AppLayout>
          <Login />
        </AppLayout>
      ),
      path: "/login",
    },
    {
      element: (
        <AppLayout>
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        </AppLayout>
      ),
      path: "/",
    },
    {
      element: (
        <AppLayout>
          <Register />
        </AppLayout>
      ),
      path: "/register",
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
