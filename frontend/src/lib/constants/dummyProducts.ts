export interface Product {
  id: string;
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  image?: string;
  status?: string;
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'KIT SDS-MAX III',
    category: 'MARTILLO',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782126676/mlltz37idqfdhud9cf2z.webp',
    status: 'NUEVO',
  },
  {
    id: '2',
    name: 'CINTA ALTA VISIBILIDAD',
    category: 'PROTECCIÓN',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782126243/crgveynglkgdgtz4f4po.webp',
    status: 'OFERTA',
  },
  {
    id: '3',
    name: 'JUEGO DE PUNTAS',
    category: 'ACCESORIOS',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782125519/xmuczhmrbfce9h3gasgz.webp',
    status: 'TOP',
  },
  {
    id: '4',
    name: 'ADAPTADOR DE IMPACTO',
    category: 'CONECTIVIDAD',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782125093/dgrjuadpmjhz2sbxvbhb.webp',
    status: 'BAJO STOCK',
  },
  {
    id: '5',
    name: 'INTERCAMBIADOR M12',
    category: 'CONECTIVIDAD',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782126676/mlltz37idqfdhud9cf2z.webp',
    status: 'TOP',
  },
  {
    id: '6',
    name: 'CONTENEDOR PACKOUT',
    category: 'ALMACENAMIENTO',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782126243/crgveynglkgdgtz4f4po.webp',
    status: 'MÁS VENDIDO',
  },
  {
    id: '7',
    name: 'SOPORTE MAGNÉTICO',
    category: 'ACCESORIOS',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782125519/xmuczhmrbfce9h3gasgz.webp',
    status: 'NUEVO',
  },
  {
    id: '8',
    name: 'KIT CONECTOR',
    category: 'ADAPTADORES',
    image: 'https://res.cloudinary.com/dzualplqi/image/upload/v1782125093/dgrjuadpmjhz2sbxvbhb.webp',
    status: 'NUEVO',
  },
];
