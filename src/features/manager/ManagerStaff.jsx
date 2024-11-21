import { useEffect, useState } from "react";
import useStore from "../../app/store";
import {
  Box,
  Container,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddStaff from "./AddStaff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export default function ManagerStaff() {
  const [page, setPage] = useState(1);
  const [listUser, setListUser] = useState([]);
  const totalPages = useStore((state) => state.totalPages);
  const postListUser = useStore((state) => state.postListUser);
  const patchStatusStaff = useStore((state) => state.patchStatusStaff);
  const fetchUser = async () => {
    console.log("Fetching data with page:", page);
    await postListUser(page, 10);
    const userList = useStore.getState().userList;
    console.log("Fetched user list:", userList);
    setListUser(userList || []);
  };

  useEffect(() => {
    fetchUser();
  }, [page]);

  const handleDelete = async (id, status) => {
    console.log("id", id);
    console.log("status", status);
    await patchStatusStaff(id, !status);
    await postListUser(page, 10);
    const userList = useStore.getState().userList;
    setListUser(userList || []);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const staffRoleList = listUser.filter((user) => user.role === "Staff");

  return (
    <>
      <Container>
        <Box marginTop={1}>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Staff List
          </Typography>

          <AddStaff onAdd={fetchUser} />

          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed" }} aria-label="Staff table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffRoleList.length > 0 ? (
                  staffRoleList.map((staff) => (
                    <TableRow key={staff.userId}>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>
                        <IconButton
                          color={staff.status ? "error" : "success"}
                          onClick={() =>
                            handleDelete(staff.userId, staff.status)
                          }
                          aria-label="toggle status"
                        >
                          {staff.status ? (
                            <ToggleOnIcon
                              style={{ color: "green", fontSize: "2.5rem" }}
                            />
                          ) : (
                            <ToggleOffIcon
                              style={{ color: "red", fontSize: "2.5rem" }}
                            />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No staff found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "black",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#FF204E",
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
