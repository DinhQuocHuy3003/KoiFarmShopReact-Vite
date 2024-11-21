import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../app/store";
import { original } from "immer";
import { Box, Grid, Typography } from "@mui/material";
import ImageGallery from "react-image-gallery";

export default function FishDetail() {
  const {getFishes, fishes} = useStore((state) => ({
    getFishes: state.getFishes,
    fishes: state.fishes,
  }));
  
  const navigate = useNavigate();
  const params = useParams();

  const getFishById = useStore((state) => state.getFishById);
  const getSearchFishForUser = useStore(
    (state) => state.getSearchFishForUser
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getFishes();
  }, []);
  const fishDetail = useStore((state) => state.fishDetail);

  const images = fishDetail?.data?.image.map((url) => ({
    original: url,
    thumbnail: url,
    originalHeight: 300,
    originalWidth: 500,
  }));

  const searchResult = useStore((state) => state.searchResult);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {images && (
              <ImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay
                showNav={false}
                items={images}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" flexDirection="column">
            <Typography
            variant="h3"
            sx={{ fontWeight: "bold", fontFamily: "sans-serif"}}>
              {productDetail?.data?.productName?.charAt(0).toUpperCase() + 
              productDetail?.data?.productName?.slice(1)}
            </Typography>
            <Typography variant="body1" color={"gray"}>
              {productDetail?.data?.description}
            </Typography>
          </Box>
          <hr style={{ borderTop: "2px solid black"}}/>
        </Grid>
      </Grid>
    </>
  );
}
