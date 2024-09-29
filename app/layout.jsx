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
      <head>
        <meta name="google-site-verification" content="mB51swaTi22UaoYugKDwEZYts__M_VnMWp9cuG0BrGo" />
      </head>
      <body className="min-h-screen flex flex-col justify-between ">  
        <Header />
        <main className="" >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
