import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Thesis App",
  description: "Thesis App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
