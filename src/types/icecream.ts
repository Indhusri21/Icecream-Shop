export type FlavorCategory = 'all' | 'signature' | 'seasonal' | 'dairy-free' | 'collab';

export interface Flavor {
  id: string;
  name: string;
  category: 'signature' | 'seasonal' | 'dairy-free' | 'collab';
  kicker: string;
  description: string;
  ingredients: string[];
  dairyFree: boolean;
  glutenFree: boolean;
  vegan: boolean;
  priceSingle: number;
  priceDouble: number;
  pricePint: number;
  colorHex: string;
  pairedVessel: string;
  intensity: 'Delicate & Bright' | 'Velvety & Creamy' | 'Deep & Decadent';
  originNote: string;
}

export interface VesselOption {
  id: string;
  name: string;
  description: string;
  extraPrice: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  category: 'sauce' | 'crunch' | 'delicacy';
  price: number;
  description: string;
}

export interface CartItem {
  id: string;
  type: 'scoop' | 'flight' | 'sundae' | 'pint' | 'merch';
  title: string;
  subtitle: string;
  vessel?: string;
  flavors: string[];
  toppings?: string[];
  sauces?: string[];
  price: number;
  quantity: number;
}

export interface ShopLocation {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  hours: string;
  status: string;
  phone: string;
  features: string[];
}
