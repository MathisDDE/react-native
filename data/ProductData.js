const products = [
  {
    id: '1',
    name: 'Produit 1',
    description: 'Description du produit 1',
    price: 29.99,
    image: require('../assets/bannière.webp'),
  },
  {
    id: '2',
    name: 'Produit 2',
    description: 'Description du produit 2',
    price: 19.99,
    image: require('../assets/bannière.webp'),
  },
  {
    id: '3',
    name: 'Produit 3',
    description: 'Description du produit 3',
    price: 39.99,
    image: require('../assets/bannière.webp'),
  },
];

const couponProducts = [
  { id: '1', image: require('../assets/bannière.webp'), name: 'Produit 1' },
  { id: '2', image: require('../assets/bannière.webp'), name: 'Produit 2' },
  { id: '3', image: require('../assets/bannière.webp'), name: 'Produit 3' },
];

const banners = [
  {
    id: '1',
    image: require('../assets/bannière.webp'),
    text: 'Découvrez nos offres exceptionnelles de la semaine!',
  },
  {
    id: '2',
    image: require('../assets/bannière.webp'),
    text: 'Profitez des réductions sur une sélection d’articles !',
  },
  {
    id: '3',
    image: require('../assets/bannière.webp'),
    text: 'Nouveaux produits en stock à prix réduits !',
  },
];
const offers = [
  {
    id: '1',
    image: require('../assets/bannière.webp'),
    name: 'Offre spéciale 1',
    price: 29.99,
    discount: 20,
    description: 'Description de l’offre spéciale 1',
  },
  {
    id: '2',
    image: require('../assets/bannière.webp'),
    name: 'Offre spéciale 2',
    price: 19.99,
    discount: 15,
    description: 'Description de l’offre spéciale 3',
  },
  {
    id: '3',
    image: require('../assets/bannière.webp'),
    name: 'Offre spéciale 3',
    price: 49.99,
    discount: 25,
    description: 'Description de l’offre spéciale 3',
  },
];



export { products, couponProducts, banners, offers  };
