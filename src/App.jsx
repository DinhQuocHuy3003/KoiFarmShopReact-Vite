import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";
import Cookies from "js-cookie";

import EmptyLayout from "./layouts/EmptyLayout";
import HomeLayout from "./layouts/HomeLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import ConsignmentLayout from "./layouts/ConsignmentLayout";

import SearchProduct from "./features/fishes/SearchFish";

import Home from "./pages/Home/Home";
import ProductDetail from "./features/fishes/FishDetail";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

import CreateConsignment from "./features/consignments/CreateConsignment";

import ProtectedRoute from "./ProtectedRoute";
import Profile from "./features/profile/Profiile/Profile";
import AccessDenied from "./pages/AccessDenied";

import ManagerLayout from "./layouts/ManagerLayout";
import Manager from "./features/manager/Manager";
import ManagerStaff from "./features/manager/ManagerStaff";
import ManagerCustomer from "./features/manager/ManagerCustomer";
import ManagerConsignmnet from "./features/manager/ManagerConsignment";

export default function App() {
  const colorMode = useStore((state) => state.colorMode);
  const setUserId = useStore((state) => state.setUserId);
  const userInfo = useStore((state) => state.userInfo);
  const logout = useStore((state) => state.logout);

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    // console.log("token", token);
    if (!token) {
      logout();
    }
    if (
      userInfo?.acount?.data?.role == "Customer" &&
      window.location.pathname == "/"
    ) {
      navigate("/");
    } else if (
      userInfo?.account.data.role == "Manager" &&
      window.location.pathname == "/"
    ) {
      navigate("/manager");
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="" element={<ProductDetail />} />
          <Route path="search" element={<SearchProduct />}>
            <Route path="" element={<ProductDetail />} />
          </Route>
        </Route>

        <Route path="/consignment" element={<ConsignmentLayout />}>
           <Route index element={<CreateConsignment />} />
        </Route>
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<ProfileLayout />} roles={["Customer"]} />
          }
        >
          <Route index element={<Profile />} />
        </Route>

        <Route path="/manager" element={
          <ProtectedRoute element={<ManagerLayout />}
          roles={["Manager"]}
          />
        }>
          <Route index element={<Manager />} />
          <Route path="manager" element={<Manager />} />
          <Route path="manager-staff" element={<ManagerStaff />} />
          <Route path="manager-customer" element={<ManagerCustomer />} />
          <Route path="manager-consignment" element={<ManagerConsignmnet />} />
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
