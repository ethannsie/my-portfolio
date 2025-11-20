import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer"
import { Spectral, Inter } from 'next/font/google';

import "@fontsource/stack-sans-text/400.css";
import "@fontsource/stack-sans-text/500.css";
import "@fontsource/stack-sans-text/700.css"; // import the weights you need


export const metadata = {
  title: "Portfolio - Ethan Sie",
  description: "Portfolio for Ethan Sie"
};

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-spectral",
});

const inter = Inter({
      subsets: ['latin'],
      variable: '--font-inter', // Define a CSS variable for Tailwind
    });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-stackSansText">
      <body>
        <div className="min-h-screen flex flex-col py-10">
          <Nav />


          <main>{children}</main>
          

          <Footer />
        </div>
      </body>
    </html>
  );
}
