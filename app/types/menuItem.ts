export interface MenuItemType {
    id: number;
    name: string;
    description: string;
    price: number;
    sizeAvailable: string[];
    image: string;
    onAddToCart: (item: { id: number; name: string; price: number; image: string }) => void;
  }
