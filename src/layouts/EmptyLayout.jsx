import { Outlet } from "react-router-dom";
import { Grid2 } from "@mui/material";
export default function EmptyLayout() {
    return (
        <Grid2 container>
            <Outlet />
        </Grid2>
    );
}