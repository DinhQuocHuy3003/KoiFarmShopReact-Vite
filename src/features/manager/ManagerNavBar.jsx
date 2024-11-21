// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useStore from "../../app/store";
// import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
// import { AccountCircle } from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  colors,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

// export default function MangerNavBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const navigate = useNavigate();
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const logout = useStore((state) => state.logout);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     toast.sucess("Logout successfully");
//   };

//   return (
//     <Box sx={{ flexGrow: 1, width: "100%" }}>
//       <AppBar
//         position="static"
//         sx={{ width: "100%", backgroundColor: "black" }}
//       >
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Manager
//           </Typography>
//           <div>
//             <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit">
//                 <AccountCircle />
//             </IconButton>
//             <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

export default function ManagerNavBar() {
  const userProfile = useStore((state) => state.userProfile);

  const logout = useStore((state) => state.logout);

  const pages = ["Customer"];

  const navigate = useNavigate();

  const auth = useStore((state) => state.auth);
  const getAllConsignment = useStore((state) => state.getAllConsignment);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const consignments = useStore((state) => state.consignments);

  const options =
    consignments?.data?.map((consignment) => ({
      key: consignment.requestId,
      label: consignment.consignmenttype,
    })) || [];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate("/manager");
    window.location.reload(); // F5 lại trang
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: "1201" }}>
      <Container maxWidth="100%" sx={{ display: "flex" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt=""
              style={{ width: "3rem", marginRight: 7, cursor: "pointer" }}
              onClick={handleLogoClick}
            />
            <Link
              to="/manager/manage-fishes"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#ECEBE9",
                  textDecoration: "none",
                }}
              >
                Huy's{" "}
                <span
                  style={{
                    background: "linear-gradient(to bottom, #fad126, #f15652)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Koi Farm
                </span>
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Các nút khác trong menu có thể được thêm ở đây */}
          </Box>

          {auth ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userProfile?.fullName}
                    src={userProfile?.userImageUrl}
                  />
                  <Typography sx={{ color: "white", ml: 1 }}>
                    {userProfile?.fullName}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={() => {
                      logout();
                      navigate("/");
                      toast.success("Logout successfully");
                    }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Button
                sx={{ color: "white" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
