// Product Types and Interfaces

export type ProductCategory = 
  | 'television' 
  | 'refrigerator' 
  | 'washingmachine' 
  | 'airconditioner'
  | 'bluetoothspeaker'
  | 'sewingmachine'
  | 'fan'
  | 'cooler'
  | 'iron'
  | 'mixerjuicer'
  | 'microwave'
  | 'induction'
  | 'waterheater';

export interface Product {
  _id?: string; // MongoDB ID
  id?: string; // Optional for backwards compatibility
  name: string;
  brand: string;
  category: ProductCategory;
  modelNumber: string;
  price: number;
  discountPrice?: number;
  stock: number;
  description: string;
  specifications: Record<string, any>;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFormData {
  name: string;
  brand: string;
  category: ProductCategory;
  modelNumber: string;
  price: string;
  discountPrice?: string;
  stock: string;
  description: string;
  specifications: Record<string, any>;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
}

export interface SpecificationField {
  name: string;
  label: string;
  type?: 'text' | 'checkbox' | 'number' | 'textarea';
}

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'television', label: 'Television' },
  { value: 'refrigerator', label: 'Refrigerator' },
  { value: 'washingmachine', label: 'Washing Machine' },
  { value: 'airconditioner', label: 'Air Conditioner' },
  { value: 'bluetoothspeaker', label: 'Bluetooth Speaker' },
  { value: 'sewingmachine', label: 'Sewing Machine' },
  { value: 'fan', label: 'Fan' },
  { value: 'cooler', label: 'Cooler' },
  { value: 'iron', label: 'Iron' },
  { value: 'mixerjuicer', label: 'Mixer/Juicer' },
  { value: 'microwave', label: 'Microwave' },
  { value: 'induction', label: 'Induction' },
  { value: 'waterheater', label: 'Water Heater' },
];

