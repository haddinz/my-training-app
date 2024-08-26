export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  createdAt: string;
}

export interface AddProductType {
  name: string;
  price: string;
  description: string;
  createdAt: Date;
}

export interface UpdateProductType {
  id: string;
  name: string;
  price: string;
  description: string;
}
