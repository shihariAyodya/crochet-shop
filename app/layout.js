import { Outfit } from 'next/font/google';
import '../src/index.css';
import '../src/App.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/ScrollToTopNext';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Shizelle — Handmade Crochet',
  description: 'Handmade crochet pieces, made with love in Sri Lanka.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

