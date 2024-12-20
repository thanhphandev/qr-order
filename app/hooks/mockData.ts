export interface PricePerSize {
    size: string;
    price: number;
  }
  
  export interface MenuItemType {
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
  }
  
  export const menuItems: MenuItemType[] = [
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Pizza truyền thống với phô mai Mozzarella và sốt cà chua tươi.",
      price: 120000,
      category: "Món chính",
      subcategory: "Pizza",
      pricePerSize: [
        { size: "S", price: 90000 },
        { size: "M", price: 120000 },
        { size: "L", price: 150000 }
      ],
      status: "out_of_stock",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: ["https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg"]
    },
    {
      id: "2",
      name: "Burger Gà BBQ",
      description: "Burger gà nướng BBQ với lớp phô mai tan chảy.",
      price: 85000,
      category: "Món chính",
      subcategory: "Burger",
      pricePerSize: [
        { size: "Regular", price: 85000 },
        { size: "Large", price: 100000 }
      ],
      status: "inactive",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "3",
      name: "Mì Ý Carbonara",
      description: "Mì Ý sốt kem phô mai với thịt xông khói.",
      price: 95000,
      category: "Món chính",
      subcategory: "Mì Ý",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: ["https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg"]
    },
    {
      id: "4",
      name: "Trà Sữa Trân Châu",
      description: "Trà sữa với trân châu dai giòn.",
      price: 40000,
      category: "Đồ uống",
      subcategory: "Trà sữa",
      pricePerSize: [
        { size: "M", price: 40000 },
        { size: "L", price: 50000 }
      ],
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "5",
      name: "Gà Rán Giòn Cay",
      description: "Gà rán cay giòn, hấp dẫn.",
      price: 120000,
      category: "Món chính",
      subcategory: "Gà",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "6",
      name: "Salad Caesar",
      description: "Salad tươi với sốt Caesar đặc biệt.",
      price: 70000,
      category: "Món chính",
      subcategory: "Salad",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "7",
      name: "Nước Chanh Tươi Mát",
      description: "Nước chanh tươi, giải khát hiệu quả.",
      price: 30000,
      category: "Đồ uống",
      subcategory: "Nước giải khát",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "8",
      name: "Bánh Mì Việt Nam",
      description: "Bánh mì Việt Nam với nhân thịt và rau tươi.",
      price: 25000,
      category: "Món chính",
      subcategory: "Bánh mì",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "9",
      name: "Kem Dừa",
      description: "Kem dừa ngọt mát, thích hợp cho mùa hè.",
      price: 50000,
      category: "Tráng miệng",
      subcategory: "Kem",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    },
    {
      id: "10",
      name: "Cà Phê Sữa Đá",
      description: "Cà phê sữa đá đậm đà, truyền thống Việt Nam.",
      price: 35000,
      category: "Đồ uống",
      subcategory: "Cà phê",
      status: "available",
      image: "https://www.espressoenglish.net/wp-content/uploads/2019/02/meal-2069021_640.jpg",
      additionalImages: []
    }
  ];
