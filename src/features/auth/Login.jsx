import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import { useState } from "react";

import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import Cookies from "js-cookie";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const postLogin = useStore((state) => state.postLogin);
  const getProfile = useStore((state) => state.getProfile);
  const setUserId = useStore((state) => state.setUserId);

  const navigate = useNavigate();

  const formStyle = {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    border: "1px solid #000000",
    padding: "50px 100px",
    borderRadius: "7px",
    boxShadow: "3px 7px 5px 0px #000000",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onLoginClick = async (e) => {
    e.preventDefault();

    const { email, password, rememberme } = formData;

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    await postLogin({ email, password });
    const userInfo = useStore.getState().userInfo;
    if (!userInfo || !userInfo.account || !userInfo.account.data || !userInfo.account.data.token) {
        toast.error("Login failed: Token not found!!!");
        return;
    }
    
    const auth = useStore.getState().auth;

    if (auth) {
      const token = userInfo.account.data.token;
      console.log(token);
      const decoded = jwtDecode(token);
      setUserId(decoded.UserId);
      await getProfile(decoded.UserId);

      const expireDate = new Date(decoded.exp * 1000);
      console.log("expireDate", expireDate.toUTCString());

      if (rememberme) {
        Cookies.set("token", userInfo.account.data.token, {
          expires: expireDate,
        });
      } else {
        Cookies.set("token", userInfo.account.data.token);
      }

      if (decoded.Role === "Customer") {
        navigate("/", { replace: true });
      } else if (decoded.Role === "Manager") {
        navigate("/manager", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Box sx={formStyle}>
      <Typography sx={{ marginBottom: "20px" }} variant="h5" gutterBottom>
        Login to your Account
      </Typography>

      <FormControl sx={{ marginBottom: "10px" }} variant="outlined">
        <InputLabel htmlFor="outlined-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            name="rememberme"
            checked={formData.rememberme}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      <Button
        sx={{
          marginBottom: "10px",
          backgroundColor: "#FF204E",
          "&:hover": { backgroundColor: "#FF204E" },
        }}
        variant="contained"
        onClick={onLoginClick}
      >
        Login
      </Button>
      <Button
        sx={{
          marginBottom: "10px",
          backgroundColor: "black",
          "&:hover": { backgroundColor: "black" },
        }}
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <Typography>
        Not registered yet?{" "}
        <NavLink
          style={{ textDecoration: "none", color: "#2E86ab" }}
          to="/register"
        >
          Create an account
        </NavLink>
      </Typography>
    </Box>
  );
}
