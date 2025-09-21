import { Playfair_Display } from 'next/font/google';
import { Typography } from '@mui/material';

// Specify the available weights
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','700'] });

export default function Header() {
  return (
    <Typography
      variant="h4"
      className={playfair.className}
      sx={{
        color: "#2E4265",
        textShadow: "1px 1px 2px rgba(1,1,1,0.2)",
        textAlign: 'center',
      }}
    >
      L'heure bleue
    </Typography>
  );
}
