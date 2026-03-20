import { Cake } from '@/types';
import cakeUbe from '@/assets/cake-ube.jpg';
import cakeBerry from '@/assets/cake-berry.jpg';
import cakeAcai from '@/assets/cake-acai.jpg';
import cakeRose from '@/assets/cake-rose.jpg';
import cakeMacaron from '@/assets/cake-macaron.jpg';
import cakeCheesecake from '@/assets/cake-cheesecake.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';
import weddingStructure from '@/assets/wedding-structure.jpg';

export const showcaseCakes: Cake[] = [
  {
    id: 'ube-lavender',
    name: 'Ube Lavender',
    description: 'Purple yam sponge with lavender buttercream & rose petals',
    price: 62,
    image: cakeUbe,
    category: 'signature',
    badge: 'new',
  },
  {
    id: 'berry-lilac',
    name: 'Berry Lilac',
    description: 'Mixed berry layers with white chocolate & lilac frosting',
    price: 58,
    image: cakeBerry,
    category: 'berry',
    badge: 'popular',
  },
  {
    id: 'acai-violet',
    name: 'Açaí Violet',
    description: 'Pink açaí sponge with purple coconut cream',
    price: 55,
    image: cakeAcai,
    category: 'vegan',
    badge: 'vegan',
  },
  {
    id: 'rose-cupcakes',
    name: 'Rose Petal Cupcakes',
    description: 'Vanilla cupcakes with rosewater buttercream, set of 12',
    price: 45,
    image: cakeRose,
    category: 'classic',
  },
  {
    id: 'lavender-macarons',
    name: 'Lavender Macaron Tower',
    description: 'Assorted lilac & pink macarons, tower of 24',
    price: 68,
    image: cakeMacaron,
    category: 'signature',
    badge: 'best seller',
  },
  {
    id: 'purple-cheesecake',
    name: 'Blueberry Swirl Cheesecake',
    description: 'Creamy cheesecake with purple blueberry marble swirl',
    price: 52,
    image: cakeCheesecake,
    category: 'classic',
  },
];

export const specialCakes: Cake[] = [
  {
    id: 'wedding-5tier',
    name: 'Enchanted Garden · 5 Tier',
    description: 'Elegant 5-tier wedding cake with cascading sugar roses in lilac & pink. Feeds 150 guests.',
    price: 850,
    image: weddingCake,
    category: 'wedding',
    isSpecial: true,
  },
  {
    id: 'wedding-structure',
    name: 'Grand Dessert Structure',
    description: 'Complete wedding dessert display with centrepiece cake, cupcakes, macarons & petit fours.',
    price: 1200,
    image: weddingStructure,
    category: 'structure',
    isSpecial: true,
  },
];
