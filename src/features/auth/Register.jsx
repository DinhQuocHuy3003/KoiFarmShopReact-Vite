import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button  from "@mui/material/Button"; 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import useStore from "../../app/store";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const formStyle = {
    display: "flex",
    flexFlow: "column",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #000000",
    borderRadius: "7px",
    padding: "50px 100px",
    boxShadow: "3px 7px 5px 0px #000000",
    width: "100%", // Ensure the form takes full width
    maxWidth: "800px", // Optionally set a max-width for better layout
  };

  const postRegister = useStore((state) => state.postRegister);
const isLoading = useStore((state) => state.isLoading);
const error = useStore((state) => state.error);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!!!")
      .email("Invalid Email Address!!!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/,
        "Email domain must be gmail.com or fpt.edu.vn."
      ),
    userName: Yup.string().required("Username is required!!!"),
    password: Yup.string()
      .required("Password is required!!!")
      .min(4, "Password must be between 6 and 100 characters."),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!!!")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and Confirm Password do not match."
      ),
    phoneNumber: Yup.string()
      .required("Phone Number is required!!!")
      .matches(/^\d{10,11}$/, "Phone Number must be 10 or 11 digits."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      userImageUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formDataToSend = new FormData();
      Object.keys(values).forEach((key) => {
        formDataToSend.append(key, values[key]);
      });
      formDataToSend.append(
        "userImageUrl",
        values.userImageUrl
      );

      setLoading(true);

      try {
        const response = await postRegister(formDataToSend);
        console.log(response);
        toast.success(
          "Create account successfully! Please confirm in your email."
        );
        setShowConfirmationMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Username or Email already exists!!!");
          } else if (error.response.status === 500) {
            toast.error("Register account error!!! Please check the error.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.error("Error registering:", error);
        setLoading(false);
      }
    },
  });

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Box component="form" sx={formStyle} onSubmit={formik.handleSubmit}>
      <Typography
        sx={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="h4"
        gutterBottom
      >
        Register your Account
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ margin: "10px 0" }}
                size="small"
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
              >
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-email"
                  type="text"
                  label="Email"
                  {...formik.getFieldProps("email")}
                />
                <FormHelperText>
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ margin: "10px 0" }}
                size="small"
                variant="outlined"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
              >
                <InputLabel htmlFor="outlined-username">Username</InputLabel>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-username"
                  type="text"
                  label="Username"
                  {...formik.getFieldProps("userName")}
                />
                <FormHelperText>
                  {formik.touched.userName && formik.errors.userName}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ margin: "10px 0" }}
                size="small"
                variant="outlined"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                <FormHelperText>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ margin: "10px 0" }}
                size="small"
                variant="outlined"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              >
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <FormHelperText>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, borderColor: "black", borderStyle: "dashed" }} />

      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            User Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ margin: "10px 0" }}
                size="small"
                variant="outlined"
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
              >
                <InputLabel htmlFor="outlined-phone-number">
                  Phone Number
                </InputLabel>
                <OutlinedInput
                  required
                  size="small"
                  id="outlined-phone-number"
                  type="text"
                  label="Phone Number"
                  {...formik.getFieldProps("phoneNumber")}
                />
                <FormHelperText>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button
            type="button"
            variant="contained"
            sx={{
              marginBottom: "10px",
              color: "white",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginBottom: "10px",
              backgroundColor: "#FF204E",
              "&:hover": {
                backgroundColor: "#FF204E",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Grid>
      </Grid>

      {showConfirmationMessage && (
        <Typography variant="body1" sx={{ color: "green", mt: 2 }}>
          Registration successful! Redirecting to login page...
        </Typography>
      )}
    </Box>
  );
}
