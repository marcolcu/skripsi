import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar/Navbar";
import { Providers } from "./provider";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Venn.io",
  description: "Venn.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
