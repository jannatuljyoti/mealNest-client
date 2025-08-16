

import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import JoinUs from "../layouts/JoinUs";
import Login from "../pages/JoinUs/Login";
import Register from "../pages/JoinUs/Register";
import Meals from "../pages/Home/Meals/Meals"
import UpcomingMeal from "../pages/Home/Upcoming/UpcomingMeal";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProfile from "../pages/Admin/AdminProfile";
import ManageUsers from "../pages/Admin/ManageUsers";
import AddMeal from "../pages/Admin/AddMeal";
import AllMeals from "../pages/Admin/AllMeals";
import AllReviews from "../pages/Admin/AllReviews";
import ServeMeals from "../pages/Admin/ServeMeals";
import UpcomingMeals from "../pages/Admin/UpcomingMeals";
import Faqs from "../pages/FAQs/Faqs";
import Offer from "../pages/OFFER/Offer";

import UserDashboardLayout from "../pages/UserAdmin/UserDashboardLayout";
import MyProfile from "../pages/UserAdmin/MyProfile";
import RequestMeals from "../pages/UserAdmin/RequestMeals";
import MyReviews from "../pages/UserAdmin/MyReviews";
import PaymentHistory from "../pages/UserAdmin/PaymentHistory";
import PrivateRoute from "../routes/PrivateRoute";
import CheckOut from "../pages/CheckOut/CheckOut";
import MealDetails from "../pages/Home/MealsByCategory/MealDetails";
import StripeProvider from "../context/StripeProvider";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path:"meals",
        element: <Meals></Meals>
      },
      {
        path: "upcoming-meal",
        element:<UpcomingMeal></UpcomingMeal>
      },
      {
        path:"faqs",
        element:<Faqs></Faqs>
      },
      {
        path:"offer",
        element:<Offer></Offer>
      }
    ],
    
  },
  {
path: "/checkout/:packageName/:price",
    element:<PrivateRoute>
      <StripeProvider>
        <CheckOut></CheckOut>
      </StripeProvider>
    </PrivateRoute>
  },
  {
    path:"/meal/:id",
    element:<MealDetails></MealDetails>
  },
  {
    path: "/join-us",
    element: <JoinUs />,
    // children: [
    //   {
    //     path: "login",
    //     element: <Login />
    //   },
    //   {
    //     path: "register",
    //     element: <Register />
    //   },
    // ],
  },

  // ✅ User Dashboard
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "request-meals",
        element: <RequestMeals />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },

  // ✅ Admin Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <AdminProfile />
      },
      {
        path: "manage-users",
        element: <ManageUsers />
      },
      {
        path: "add-meal",
        element: <AddMeal />
      },
      {
        path: "all-meals",
        element: <AllMeals />
      },
      {
        path: "all-reviews",
        element: <AllReviews />
      },
      {
        path: "serve-meals",
        element: <ServeMeals />
      },
      {
        path: "upcoming-meals",
        element: <UpcomingMeals />
      },
    ],
  },
]);
