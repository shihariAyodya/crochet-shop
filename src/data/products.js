import topPink1 from '../assets/products/top-pink-white-1.png.png';
import topPurple1 from '../assets/products/top-purple-white-1.png.png';
import topGreen1 from '../assets/products/top-green-white-1.png.png.jpg';

export const products = [
  {
    id: 1,
    name: 'Ocean Mesh Top',
    category: 'Meshtops',
    price: 'Rs. 2,800',
    description: 'A breezy, open-weave crochet mesh top — perfect layered over a bralette or swimsuit.',
    images: 3,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Cream', hex: '#faf6f2', available: true },
      { name: 'Sage Green', hex: '#9caf88', available: true },
      { name: 'Black', hex: '#333333', available: false },
    ],
  },
  {
    id: 2,
    name: 'Sunset Mesh Top',
    category: 'Meshtops',
    price: 'Rs. 2,900',
    description: 'A lightweight patterned mesh top with delicate open stitching, great for a beach day or casual outing.',
    images: 3,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Terracotta', hex: '#c1694f', available: true },
      { name: 'Dusty Rose', hex: '#c98a94', available: true },
    ],
  },
  {
    id: 3,
    name: 'Cloud Knit Cardigan',
    category: 'Cardigans',
    price: 'Rs. 4,500',
    description: 'A soft, oversized cardigan with wooden buttons — cozy enough for cool evenings, light enough for spring.',
    images: 3,
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Cream', hex: '#faf6f2', available: true },
      { name: 'Powder Blue', hex: '#b8d0dc', available: true },
      { name: 'Blush Pink', hex: '#f0c8ce', available: false },
    ],
  },
  {
    id: 4,
    name: 'Granny Square Cardigan',
    category: 'Cardigans',
    price: 'Rs. 4,800',
    description: 'A classic granny-square patterned cardigan, handmade with a mix of warm earthy tones.',
    images: 3,
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Multicolor', hex: '#c98a94', available: true },
      { name: 'Neutral Tones', hex: '#d8c3a5', available: true },
    ],
  },
  {
  id: 5,
  name: 'Striped Crochet Meshtop',
  category: 'Meshtops',
  prices: {
    XS: 'Rs. 2,300',
    S: 'Rs. 2,500',
    M: 'Rs. 3,000',
    L: 'Rs. 3,300',
    XL: 'Rs. 3,500',
  },
  description: 'A relaxed, open-weave crochet mesh top with bold horizontal stripes and flowing bell sleeves — made with soft cotton yarn.',
 images: [topPink1, topPurple1, topGreen1],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
  { name: 'Pink & White', hex: ['#c98a94', '#ffffff'], available: true, imageIndex: 0 },
  { name: 'Purple & White', hex: ['#a893c9', '#ffffff'], available: true, imageIndex: 1 },
  { name: 'Green & White', hex: ['#9caf88', '#ffffff'], available: true, imageIndex: 2 },
  
],
},
  {
    id: 6,
    name: 'Halter Crop Top',
    category: 'Croptops',
    price: 'Rs. 2,000',
    description: 'A halter-neck crop top with an adjustable tie back, handmade with soft cotton yarn.',
    images: 3,
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Sage Green', hex: '#9caf88', available: true },
      { name: 'Dusty Rose', hex: '#c98a94', available: false },
    ],
  },
  {
    id: 7,
    name: 'Beach Cover-Up Dress',
    category: 'Beachwear',
    price: 'Rs. 3,600',
    description: 'A flowy, semi-sheer crochet cover-up — ideal thrown over a swimsuit for a beach day or resort look.',
    images: 3,
    sizes: ['One Size'],
    colors: [
      { name: 'Cream', hex: '#faf6f2', available: true },
      { name: 'Beige', hex: '#d8c3a5', available: true },
    ],
  },
  {
    id: 8,
    name: 'Fringe Beach Bikini Top',
    category: 'Beachwear',
    price: 'Rs. 2,400',
    description: 'A crochet bikini top with playful fringe detailing, made with quick-dry cotton yarn.',
    images: 3,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Terracotta', hex: '#c1694f', available: true },
      { name: 'Powder Blue', hex: '#b8d0dc', available: true },
    ],
  },
];