import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import { Entry } from "../components/Entry"
import BlogList from "../components/BlogList";
import ProfileList from "../components/ProfileList";
import SingleBlog from "../components/SingleBlog";
import BlogById from '../components/BlogById'
import Profile from '../components/Profile'
import CreateBlog from "../components/CreateBlog";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <BlogList />,
      },
      {
        path: 'entry',
        element: <Entry />,
      },
      {
        path: 'new',
        element: <CreateBlog />,
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            path: '',
            element: <ProfileList/>,
          },
          {
            path: 'blog/:blogId',
            element: <BlogById />,
          },
        ]
      },
      {
        path: 'blog/:blogId',
        element: <SingleBlog />,
      },
    ],
  },
]);
