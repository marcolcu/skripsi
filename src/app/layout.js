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
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <ToastContainer />
        <Providers>
          <Navbar />
          <main className="flex-grow my-5">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
