import { useEffect, useState } from "react";
import useStore from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export default function NavBar() {
  const userProfile = useStore((state) => state.userProfile);
  const [categories, setCategories] = useState([]);
  const cartItems = useStore((state) => state.cartItems);

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const setAuth = useStore((state) => state.setAuth);

  const pages = ["User"];
  const settings = ["Profile", "Logout"];
  // const options = ["Electronics", "Stationery", "Papers", "Sensors", "Pen"];

  const navigate = useNavigate();
  const auth = useStore((state) => state.auth);
  //const getAllCategories = useStore((state) => state.getAllCategories);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const categories = [
      {
        path: "/",
        name: "Home",
      },
      {
        path: "/",
        name: "Koi",
      },
      {
        path: "/consignment",
        name: "Consignment",
      },
    ];
    console.log("Categories: ", categories);
    setCategories(categories);
  }, []);

  const logout = useStore((state) => state.logout);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "black", zIndex: "99999999" }}
    >
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
            />
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Link to={`/${page}`}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
              {/* {categories.map((category) => (
                <MenuItem key={category}>
                  <Link
                    to={`/${category.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography textAlign="center">{category}</Typography>
                  </Link>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <Button
                key={category.name}
                sx={{ color: "white", display: "block", mx: 2 }}
                onClick={() => navigate(category.path)}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{ color: "white", marginRight: 2 }}
            >
              <Badge
                badgeContent={cartItems?.length || 0}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#f15652",
                    color: "white",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* User Section */}
          {auth ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userProfile?.userName}
                    src={userProfile?.userImageUrl}
                  />
                  <Typography sx={{ color: "white", ml: 1 }}></Typography>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Logout" ? (
                      <Typography
                        onClick={() => {
                          logout();
                          navigate("/");
                          toast.success("Logout successfully");
                        }}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    ) : (
                      <Typography
                        onClick={() => {
                          navigate("/profile");
                        }}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
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
