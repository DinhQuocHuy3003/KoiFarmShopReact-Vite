import { Grid, Pagination, Stack, Typography } from "@mui/material";
import FishCard from "../../features/fishes/FishCard";

export default function FishList({
  fishes,
  page,
  handleChangePage,
  totalPage,
}) {
  return (
    <Grid item xs={10}>
      <Grid container spacing={1}>
        {fishes.length > 0 ? (
          fishes.map((item) => (
            <Grid item key={item.fishId} xs={12} sm={6} md={4} lg={3} xl={2}>
              <FishCard item={item} />
            </Grid>
          ))
        ) : (
          <Typography variant="h4">No Fishes</Typography>
        )}
      </Grid>
      <Stack spacing={2} alignItems="center" marginTop={5}>
        <Pagination
          count={totalPage || 1}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </Grid>
  );
}
