"use client";

import { usePathname } from "next/navigation";
import AppBar from "@/components/AppBar";

export default function AppBarWrapper() {
  const pathname = usePathname();

  // Show AppBar only on home page
  if (pathname !== "/") {
    return null;
  }

  return <AppBar />;
}
