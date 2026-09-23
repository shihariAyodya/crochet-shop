import topPink1 from '../assets/products/top-pink-white-1.png.png';
import topPurple1 from '../assets/products/top-purple-white-1.png.png';
import topGreen1 from '../assets/products/top-green-white-1.png.png.jpg';
import halterPink from '../assets/products/halter-pink.jpg';
import halterOffWhite from '../assets/products/halter-white.jpg';
import halterLightBlue from '../assets/products/halter-lightblue.jpg';
import halterYellow from '../assets/products/halter-yellow.jpg';
import halterGreen from '../assets/products/halter-green.jpg';
import grannyBlue from '../assets/products/granny-square-blue.jpg';
import meshtopGreen from '../assets/products/meshtop-green.jpg';
import meshtopWhite from '../assets/products/meshtop-white.jpg';
import meshtopBlack from '../assets/products/meshtop-pink.jpg';
import babyDresPurple from '../assets/products/babydress-purple.jpeg';
import babyDressCream from '../assets/products/babydress-cream.jpeg';
import babyDressPink from '../assets/products/babydress-pink.jpeg';
import babyDressYellow from '../assets/products/babydress-yellow.jpeg';
import babyDressGreen from '../assets/products/babydress-green.jpeg';



export const products = [
  {
  id: 1,
  name: 'Ocean Mesh Top',
  category: 'Meshtops',
  price: 'Rs. 2,800',
  description: 'A breezy, open-weave crochet mesh top — perfect layered over a bralette or swimsuit.',
  images: [meshtopGreen, meshtopWhite, meshtopBlack],
  sizes: ['S', 'M', 'L'],
  colors: [
    { name: 'Cream', hex: '#faf6f2', available: true, imageIndex: 1 },
    { name: 'Sage Green', hex: '#9caf88', available: true, imageIndex: 0 },
    { name: 'Black', hex: '#c98a94', available: false, imageIndex: 2 },
  ],
},
  /*{
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
  },*/
  {
    id: 3,
    name: 'Halter Crop Top',
    category: 'CropTops',
    price: 'Rs. 2,500',
    description: 'A stylish crochet halter top with a flattering fit — lightweight, comfortable, and perfect for sunny days or layering.',
    images: [halterPink, halterOffWhite, halterLightBlue, halterYellow, halterGreen, halterGreen],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pink', hex: '#C67683', available: true, imageIndex: 0 },
      { name: 'Off-White', hex: '#EFEBDC', available: true, imageIndex: 1 },
      { name: 'Light Blue', hex: '#9EC3E5', available: true, imageIndex: 2 },
      { name: 'Yellow', hex: '#E6B223', available: true, imageIndex: 3 },
      { name: 'Green', hex: '#4E8047', available: true, imageIndex: 4 },
      { name: 'Dark Green', hex: '#2d4a3e', available: true, imageIndex: 5 },
    ],
  },
  {
  id: 4,
  name: 'Granny Square Cardigan',
  category: 'Cardigans',
  price: 'Rs. 4,800',
  description: 'A classic granny-square patterned cardigan, handmade with a mix of warm earthy tones.',
  images: [grannyBlue],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Multicolor', hex: ['#FDFBF7', '#0B2545', '#A9D6E5'], available: true, imageIndex: 0 },
    { name: 'Neutral Tones', hex: '#d8c3a5', available: false },
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
    name: 'Classic Halter Top',
    category: 'CropTops',
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
  name: 'Baby Dresses',
  category: 'Baby',
  price: 'Rs. 2,400',
  description: 'A charming crochet baby dress featuring playful detailing, made with soft, breathable cotton yarn.',
  images: [babyDresPurple, babyDressCream, babyDressPink, babyDressYellow, babyDressGreen],
  sizes: ['S', 'M', 'L'],
  colors: [
    { name: 'Purple', hex: '#a893c9', available: true, imageIndex: 0 },
    { name: 'Cream', hex: '#faf6f2', available: true, imageIndex: 1 },
    { name: 'Pink', hex: '#c98a94', available: true, imageIndex: 2 },
    { name: 'Yellow', hex: '#e6b223', available: true, imageIndex: 3 },
    { name: 'Green', hex: '#9caf88', available: true, imageIndex: 4 },
  ],
},
];