"use client";

import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function MenuCard({
  title,
  price,
  image,
  quantity,
  onQuantityChange,
  onOrder,
}) {
  return (
    <Card
      sx={{
        width: 260,
        borderRadius: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#2E4265" }}>
          {title}
        </Typography>
        <Typography sx={{ color: "#2E4265", mb: 2 }}>${price}</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1 }}>
          <Button
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            sx={{ minWidth: 0, color: "#2E4265" }}
          >
            <Remove />
          </Button>
          <Typography sx={{ mx: 2 }}>{quantity}</Typography>
          <Button
            onClick={() => {
              onQuantityChange(quantity + 1);
              onOrder(); // ✅ adds to cart and updates badge
            }}
            sx={{ minWidth: 0, color: "#2E4265" }}
          >
            <Add />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
