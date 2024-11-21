import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function FishCard({
  item,
  isDisable = false,
  onSelect,
  cardType,
  onAddToCart,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDisable && onSelect) {
      onSelect(cardType, item);
    } else {
      navigate(`/fishes/${item.fishId}`, { state: item });
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const iconStyle = {
    color: "#555",
    fontSize: "1.2rem",
    marginRight: 0.5,
  };

  return (
    <Card
      key={item.fishId}
      sx={{
        maxWidth: 345,
        minWidth: 200,
        marginX: 1,
        marginY: 1,
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: isDisable ? "none" : "scale(1.03)",
          boxShadow: isDisable ? "none" : "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea disabled={isDisable} onClick={handleClick}>
        <Box
          sx={{
            position: "relative",
            border: "10px solid transparent",
            borderImage: "url(border_image.png) 180 round",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={`${item.image}?w=150&h=150&fit=crop&auto=format`}
            alt={item.productName}
            sx={{
              objectFit: "cover",
              objectFit: "contain",
              width: "100%",
            }}
          />
        </Box>
        <Divider sx={{ borderBottomWidth: 2, borderColor: "GrayText" }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: "600",
              color: "#333",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {item.price} VNĐ
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              gap: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Origin: {item.origin}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Gender: {item.gender}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Age: {item.age}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Size: {item.size}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Breed: {item.breed}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={isDisable}
        >
          Add To Cart
        </Button>
      </Box>
    </Card>
  );
}
