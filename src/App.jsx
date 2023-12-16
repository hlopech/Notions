import RequireAuth from "./components/RequireAuth";
import UserContextProvider from "./components/UserContextProvider";
import About from "./routes/About/About";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout/Layout";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";
import Notes, { loader as notesLoader } from "./routes/Notes/Notes";
import NotePage, { loader as noteLoader } from "./routes/NotePage/NotePage";
import EditNote, { loader } from "./routes/EditNote/EditNote";
import AddNote from "./routes/AddNote/AddNote";
import ErrorPage from "./routes/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <SignUp />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/notes/:userId",
        errorElement: <ErrorPage />,
        loader: notesLoader,
        element: <Notes />,
      },
      {
        path: "/note/:id",
        loader: noteLoader,
        errorElement: <ErrorPage />,
        element: <NotePage />,
      },
      {
        errorElement: <ErrorPage />,
        path: "/edit-note/:id",
        loader: loader,
        element: <EditNote />,
      },
      {
        path: "/create-note",
        element: <AddNote />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
