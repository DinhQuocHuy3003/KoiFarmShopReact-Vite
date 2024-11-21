import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (fish) => {
    const existingFish = cart.findIndex((item) => item.fishId === fish.fishId);

    if (existingFish === -1) {
      setCart([...cart, { ...fish, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[existingFish].quantity += 1;
      setCart(updatedCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, fish) => total + fish.price * fish.quantity, 0);
  };

  const handleRemoveFish = (fishId) => {
    const updatedCart = cart.filter((item) => item.fishId !== fishId);
    setCart(updatedCart);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="g4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your shopping cart is empty!!!</Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((item) => (
            <Grid item key={item.fishId} xs={12} sm={6} md={4}>
              <Box
                sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 2 }}
              >
                <Typography variant="h6">{item.image}</Typography>
                <Typography variant="body1">Price: {item.price} VNĐ</Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const updatedCart = [...cart];
                      updatedCart.find(
                        (fish) => fish.fishId === item.fishId
                      ).quantity = parseInt(e.target.value);
                      setCart(updatedCart);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{ width: "60px", marginRight: 1 }}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveFish(item.fishId)}
                  >
                    Remove
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total: {item.price * item.quantity} VNĐ
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Total cart value: {getTotalPrice()} VNĐ</Typography>
        <Button variant="contained" color="primary">Place Order</Button>
      </Box>
    </Box>
  );
}
