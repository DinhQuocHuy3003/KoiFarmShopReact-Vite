import { Outlet, useNavigate } from "react-router-dom";
import MangerNavBar from "../features/manager/ManagerNavBar";
import { Button, Grid, Typography } from "@mui/material";
export default function ManagerLayout() {
  const navigate = useNavigate();

  return (
    <>
      <MangerNavBar />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          lg={2}
          sm={12}
          sx={{
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            height: "100vh",
            boxShadow: 3,
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: 3, textAlign: "center", color: "#333" }}
          >
            Panel
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/manager/manager-staff")}
            sx={{
              marginBottom: 2,
              color: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Staff Management
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/manager/manager-customer")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Customer Management
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/manager/manager-consignment")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Consignment Management
          </Button>

        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
