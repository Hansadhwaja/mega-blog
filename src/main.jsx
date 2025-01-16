import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Home from './pages/Home/Home.jsx'
import AddPost from './pages/Post/AddPost.jsx'
import Post from './pages/Post/Post.jsx'
import Edit from './pages/Post/Edit.jsx'
import MyPosts from './pages/Post/MyPosts.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'addpost',
        element: <AddPost />
      },
      {
        path: 'myposts',
        element: <MyPosts />
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/edit/:slug",
        element: <Edit />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)


