interface PricePerSize {
  size: string;
  price: number;
}

export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number; 
  category: string;
  subcategory?: string;
  pricePerSize?: PricePerSize[];
  status: "available" | "out_of_stock" | "inactive";
  image: string;
  additionalImages?: string[];
  onAddCart: (item: { id: string; name: string; size?: string; price: number; image: string }) => void
}

