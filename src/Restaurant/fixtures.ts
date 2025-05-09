import RestaurantStructure from "./types.js";

export const losPollosHermanos = {
  _id: "1",
  name: "Los Pollos Hermanos",
  adress: "Albuquerque, New Mexico",
  foodType: "Pollos fritos / Fast food",
  imageUrl: "https://example.com/los-pollos.jpg",
  description:
    "Famoso por su pollo crujiente y limpio ambiente familiar. Ideal para quienes valoran la eficiencia y la precisión... en todos los sentidos.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Muy bueno",
  priceCategory: "Medio",
  rating: 4.2,
  visitDate: new Date("2023-05-12"),
};

export const monksCafe = {
  _id: "2",
  name: "Monk's Café",
  adress: "West 112th Street, Nueva York",
  foodType: "Diner Americano",
  imageUrl: "https://example.com/monks-cafe.jpg",
  description:
    "Punto de encuentro habitual de un grupo muy particular de amigos. Café sencillo, comida básica, ambiente acogedor.",
  isVisited: false,
};

export const centralPerk = {
  _id: "3",
  name: "Central Perk",
  adress: "Greenwich Village, Nueva York",
  foodType: "Café y pastelería",
  imageUrl: "https://example.com/central-perk.jpg",
  description:
    "Más que un café: un lugar para contar tus problemas mientras bebes un espresso XL en el mismo sofá de siempre.",
  isVisited: true,
  servingsAmount: "Poca",
  waitTime: "Normal",
  customerService: "Bueno",
  priceCategory: "Medio",
  rating: 3.9,
  visitDate: new Date("2023-03-17"),
};

export const jjsDinner = {
  _id: "4",
  name: "JJ's Diner",
  adress: "Pawnee, Indiana",
  foodType: "Desayunos",
  imageUrl: "https://example.com/jjs-diner.jpg",
  description:
    "Los mejores waffles del mundo según Leslie Knope. Y eso no es poca cosa.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Poco",
  customerService: "Muy bueno",
  priceCategory: "Bajo",
  rating: 4.3,
  visitDate: new Date("2022-11-09"),
};

export const freddysBbq = {
  _id: "5",
  name: "Freddy's BBQ Joint",
  adress: "Washington D.C.",
  foodType: "Barbacoa",
  imageUrl: "https://example.com/freddys-bbq.jpg",
  description:
    "Un lugar discreto para comer costillas con las manos... incluso si eres el presidente.",
  isVisited: true,
  servingsAmount: "Generosa",
  waitTime: "Normal",
  customerService: "Bueno",
  priceCategory: "Medio",
  rating: 4,
  visitDate: new Date("2023-06-30"),
};

export const bobsBurgers = {
  _id: "6",
  name: "Bob's Burgers",
  adress: "Ocean Avenue, USA",
  foodType: "Hamburguesas",
  imageUrl: "https://example.com/bobs-burgers.jpg",
  description:
    "Restaurante familiar con un dueño muy excéntrico y recetas semanales únicas. Las hamburguesas son tan buenas como raras.",
  isVisited: false,
};

export const restaurantFixtures: RestaurantStructure[] = [
  losPollosHermanos,
  monksCafe,
  centralPerk,
  jjsDinner,
  freddysBbq,
  bobsBurgers,
];
