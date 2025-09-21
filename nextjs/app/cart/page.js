"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Container,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Add, Remove, ShoppingCartOutlined, ArrowBack } from '@mui/icons-material';
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  
  // Cart items - starts empty, items will be added from menu page
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleContinueShopping = () => {
    router.push("/menu");
  };

  const handleSendOrder = () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order sent! Total: $${totalPrice}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FCFAF8',
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleContinueShopping}
            sx={{
              color: "#2E4265",
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              padding: 0
            }}
          >
            Continue Shopping
          </Button>
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "#2E4265",
              textShadow: "2px 2px 4px rgba(1, 1, 1, 0.2)",
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            L'heure bleue
          </Typography>

          <Box sx={{ width: { xs: 80, sm: 100, md: 120 } }} /> {/* Spacer for centering */}
        </Box>

        {/* Gray line separator */}
        <Box
          sx={{
            height: 1,
            backgroundColor: '#E0E0E0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            marginBottom: 2
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ padding: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Shopping Cart Title */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#2E4265",
            fontWeight: 'bold',
            marginBottom: 1,
            textAlign: 'left',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Shopping Cart
        </Typography>

        {/* Cart Status */}
        <Typography
          sx={{
            color: "#666",
            textAlign: 'left',
            marginBottom: 4,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
          }}
        >
          You have <span style={{ color: '#FF6B6B' }}>{totalItems}</span> <span style={{ color: '#FF6B6B' }}>{totalItems === 1 ? 'item' : 'items'}</span> in your cart.
        </Typography>

        {/* Empty Cart State */}
        {totalItems === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              padding: { xs: 4, sm: 6, md: 8 },
              backgroundColor: '#E0EBFF',
              borderRadius: 4,
              marginBottom: 4,
              minHeight: { xs: 200, sm: 250, md: 300 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <ShoppingCartOutlined
              sx={{
                fontSize: { xs: 60, sm: 80, md: 100 },
                color: "#2E4265",
                marginBottom: 2
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "#2E4265",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              No item in your cart yet :(
            </Typography>
          </Box>
        )}

        {/* Cart Items */}
        <Box sx={{ marginBottom: 4 }}>
          {cartItems.filter(item => item.quantity > 0).map((item) => (
            <Card
              key={item.id}
              sx={{
                marginBottom: 2,
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                <Grid container alignItems="center" spacing={3}>
                  {/* Coffee Image */}
                  <Grid item xs={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </Grid>

                  {/* Item Name */}
                  <Grid item xs={4}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2E4265",
                        fontWeight: 'bold'
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Grid>

                  {/* Price */}
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2E4265",
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                      }}
                    >
                      <IconButton
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                        sx={{
                          backgroundColor: '#F5F5F5',
                          '&:hover': { backgroundColor: '#E0E0E0' },
                          '&:disabled': { backgroundColor: '#F5F5F5' }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          color: "#2E4265",
                          fontWeight: 'bold',
                          minWidth: 30,
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        onClick={() => updateQuantity(item.id, 1)}
                        sx={{
                          backgroundColor: '#F5F5F5',
                          '&:hover': { backgroundColor: '#E0E0E0' }
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Cart Footer */}
        <Box
          sx={{
            backgroundColor: '#E0EBFF',
            borderRadius: '16px 16px 0 0',
            padding: { xs: 2, sm: 3, md: 4 },
            marginTop: 'auto',
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#2E4265",
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
                }}
              >
                Total
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#2E4265",
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
              >
                ${totalPrice}
              </Typography>
            </Grid>
            
            <Grid item xs={4}>
              <Button
                onClick={handleSendOrder}
                fullWidth
                sx={{
                  height: { xs: 40, sm: 45, md: 50 },
                  borderRadius: '25px',
                  backgroundColor: '#FFFFFF',
                  color: '#2E4265',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  border: '2px solid #2E4265',
                  '&:hover': { 
                    backgroundColor: '#2E4265', 
                    color: '#FFFFFF' 
                  },
                  '&:disabled': { 
                    backgroundColor: '#E0EBFF',
                    color: '#8C9EBE',
                    border: '2px solid #8C9EBE'
                  }
                }}
                disabled={totalItems === 0}
              >
                Send Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}