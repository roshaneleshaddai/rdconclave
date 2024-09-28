import "./globals.css";
import Footer from '../app/components/footer/page';
import Header from "../app/components/header/page";

export const metadata = {
  title: "VRSEC",
  description: "A new Millennium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between ">  
        <Header />
        <main className="" >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
