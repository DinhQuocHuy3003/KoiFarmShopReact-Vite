import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../app/store";
import { Avatar, Badge, Box, Grid, Typography } from "@mui/material";

export default function Profile() {
  const [isOwner, setIsOwner] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const userProfile = useStore((state) => state.userProfile);
  const otherProfile = useStore((state) => state.otherProfile); 

  return (
    <Grid container justifyContent={"center"} spacing={2}>
        <Grid item xs={12} md={12}>
        <Box
          sx={{
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            textAlign: "center",
            position: "relative",
            bgcolor: "#fafafa",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: "white",
                    border: "1px solid #e0e0e0",
                    padding: "2px",
                  }}
                ></IconButton>
              }
            >
              <Avatar
                alt={isOwner ? userProfile.lastName : otherProfile?.lastName}
                src={
                  isOwner
                    ? userProfile.userImageUrl
                    : otherProfile?.userImageUrl
                }
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </Box>

          <Typography variant="h6" sx={{ mt: 1 }}>
            {isOwner
              ? userProfile.lastName + " " + userProfile.firstName
              : otherProfile?.lastName + " " + otherProfile?.firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Phone:{" "}
            {isOwner ? userProfile.phoneNumber : otherProfile?.phoneNumber}
          </Typography>

          {userProfile?.averageNumberStars ||
          otherProfile?.averageNumberStars ? (
            <Typography>
              <Rating
                name="read-only"
                value={
                  isOwner
                    ? userProfile.averageNumberStars
                    : otherProfile?.averageNumberStars
                }
                readOnly
                precision={0.5}
                size="small"
              />
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No ratings yet
            </Typography>
          )}

          {isOwner && (
            <Button
              variant="outlined"
              sx={{
                width: "10rem",
                mt: 1,
                backgroundColor: "white",
                borderColor: "#FF204E",
                color: "#FF204E",
                "&:hover": {
                  backgroundColor: "white",
                  borderColor: "#FF204E",
                },
              }}
              onClick={() => navigate("edit-profile")}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        </Grid>
    </Grid>
  )
}