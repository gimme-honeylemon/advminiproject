import Image from "next/image";
import styles from "./page.module.css";

import { Button, Box } from "@mui/material";

import Header from "@/components/header"
import MenuCard from "@/components/MenuCard";
import Logintextbox from "@/components/Logintextbox";
import Carticon from "@/components/Carticon";

export default function Home() {
  return (
    <>
      <Header />

=======
b423f6a0d2af9b49928a83c8b3505cf7045503e4
      <Button variant="contained" sx={{ width: {sx: "200px", sm: "300px", md: "400px"} }}>
        Button button
      </Button>
      <Button variant="outlined">Button button</Button>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
        gap: 2, // space between cards
        padding: 2,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <MenuCard key={index} />
      ))}
    </Box>
    <Logintextbox />
    </>
  );
}
