import { Outfit } from 'next/font/google';
import '../src/index.css';
import '../src/App.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ScrollToTop from '../src/components/ScrollToTopNext';
import WhatsAppBubble from '../src/components/WhatsAppBubble';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://crochet-shop-olive.vercel.app'),
  title: 'Shizelle | Handmade Crochet',
  description: 'Handmade crochet pieces, made with love in Sri Lanka. Every item is made to order, just for you.',
  openGraph: {
    title: 'Shizelle | Handmade Crochet',
    description: 'Handmade crochet pieces, made with love in Sri Lanka.',
    type: 'website',
  },
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
        <WhatsAppBubble />
      </body>
    </html>
  );
}