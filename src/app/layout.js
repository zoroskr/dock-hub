import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YateMate",
  description: "Pagina orientada al intercambio de bienes y embarcaciones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_yatemate.png" />
      </head>
      <body className={inter.className}>
        <Navbar></Navbar>
        {children}
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
