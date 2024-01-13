import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/login';
import Design from '../pages/home/design';
import Home from '../pages/home';
// import UserInfo from '../pages/home/userInfo';
import Signup from '../pages/signup';
import Admin from '../pages/admin';
import Profile from '../pages/home/profile';
import ManageUser from '../pages/admin/manageUser';
import ManageBackground from '../pages/admin/manageBackground';
import ManageCard from '../pages/admin/manageCard';
import Success from '../pages/home/success';
import ChangeProfile from '../pages/home/changeProfile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/profile/:id',
                element: <Profile />,
            },
            {
                path: '/changeProfile/:id',
                element: <ChangeProfile />,
            },
            {
                path: '/design/:id?',
                element: <Design />,
            },
            {
                path: '/success',
                element: <Success />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'manageUser',
                element: <ManageUser />,
            },
            {
                path: 'manageBackground',
                element: <ManageBackground />,
            },
            {
                path: 'manageCard',
                element: <ManageCard />,
            },
        ]
    }
]);

export default router