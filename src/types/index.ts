export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'signature' | 'berry' | 'vegan' | 'classic' | 'wedding' | 'structure';
  badge?: string;
  isSpecial?: boolean;
}

export interface TrayItem {
  cake: Cake;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
