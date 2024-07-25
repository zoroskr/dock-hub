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
      <body className={inter.className}>
        <header className="pb-[132px] md:pb-[108px]">
          <Navbar />
        </header>
        {children}
        <script src="../../flowbite.min.js"></script>
      </body>
    </html>
  );
}
