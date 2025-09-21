'use client';

import { Box, Typography, Button, Container } from "@mui/material";
import { Playfair_Display, Poppins } from 'next/font/google';
import ButtonAppBar from "@/components/AppBar";
import { useRouter } from "next/navigation";

// Font configurations
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FCFAF8' }}>
      {/* AppBar with 100px height and 20px fonts */}
      <ButtonAppBar />
      
      {/* Main content with top padding to account for fixed AppBar */}
      <Box sx={{ pt: '100px' }}>
        {/* Hero Section */}
        <Box sx={{ 
          display: 'flex', 
          minHeight: 'calc(100vh - 100px)',
          backgroundColor: '#FCFAF8'
        }}>
          {/* Left Panel - Coffee Image */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '60px',
            backgroundColor: '#A8B8D8',
            position: 'relative'
          }}>
            {/* Coffee Image from public folder */}
            <Box
              component="img"
              src="/image.png"
              alt="Iced Coffee"
              sx={{
                width: '400px',
                height: '500px',
                objectFit: 'cover',
                borderRadius: '60px',
                backgroundColor: '#E8F0FF'
              }}
              onError={(e) => {
                // Fallback if image doesn't exist
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder if image doesn't exist */}
            <Box sx={{
              width: '400px',
              height: '500px',
              backgroundColor: '#8B4513',
              borderRadius: '60px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '50%',
              left: '60px',
              transform: 'translateY(-50%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '20%',
                left: '10%',
                right: '10%',
                height: '30%',
                backgroundColor: '#F5F5DC',
                borderRadius: '30px'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '10%',
                right: '10%',
                height: '40%',
                backgroundColor: '#D2691E',
                borderRadius: '30px'
              }
            }}>
              <Typography 
                sx={{ 
                  color: 'white', 
                  fontSize: '24px', 
                  fontWeight: 600,
                  zIndex: 1,
                  textAlign: 'center'
                }}
              >
                Iced Coffee
              </Typography>
            </Box>
          </Box>

          {/* Right Panel - Text Content */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
            gap: '30px'
          }}>
            {/* Brand Name */}
            <Typography 
              className={playfair.className}
              sx={{
                fontSize: '4rem',
                fontWeight: 700,
                color: '#2E4265',
                lineHeight: 1.1,
                marginBottom: '10px'
              }}
            >
              L'heure bleue
            </Typography>

            {/* Slogan */}
            <Typography 
              className={playfair.className}
              sx={{
                fontSize: '1.5rem',
                fontWeight: 400,
                color: '#2E4265',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}
            >
              Elegance in Every Sip
            </Typography>

            {/* Description */}
            <Typography 
              className={poppins.className}
              sx={{
                fontSize: '1.1rem',
                fontWeight: 400,
                color: '#4A5568',
                lineHeight: 1.6,
                maxWidth: '500px',
                marginBottom: '30px'
              }}
            >
              Because coffee isn't just a drink — it's comfort, energy, and a moment of calm, brought right to your soul.
            </Typography>

            {/* Call-to-Action Buttons */}
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Button
                onClick={() => router.push('/menu')}
                sx={{
                  backgroundColor: '#2E4265',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1F2D4D',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(46, 66, 101, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Explore our products
              </Button>
              
              <Button
                onClick={() => router.push('/login')}
                sx={{
                  backgroundColor: '#8C9EBE',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#7A8BAE',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(140, 158, 190, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Log in / Sign up
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
