export interface SubCategory {
    id: number;
    name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    icon: any;
    subCategories: SubCategory[];
  }
  