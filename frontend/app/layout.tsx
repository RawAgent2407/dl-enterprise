import { Instrument_Sans, Poppins, Montserrat, DM_Sans, Onest } from "next/font/google";
import { getMegaMenuCategories } from "@/lib/queries/category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const megaMenuData: any[] = await getMegaMenuCategories();
  return (
    <html lang="en">
      <body className={` overflow-x-hidden
          ${instrumentSans.variable} 
          ${montserrat.variable} 
          ${dmSans.variable} 
          ${poppins.variable}
          ${onest.variable}
        `}>
        <Header megaMenuData={megaMenuData} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
