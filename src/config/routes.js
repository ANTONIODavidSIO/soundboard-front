import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  import ProtectedRoutes from "../components/protectedRoute";
  import Login from "../screens/login";
  import SoundBoardPage from "../screens/soundBoardPage";
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Login/>,
      },
   
    {
        path: "/soundBoard",
        element: <ProtectedRoutes component={SoundBoardPage} />,
    },
    ]);
  const Routes = () => {
      return (
          <RouterProvider router={router} />
      );
  }
  
  export default Routes;