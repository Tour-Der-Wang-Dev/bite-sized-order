
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  coverImageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  address: string;
  phone: string;
  openHours: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timestamp: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  deliveryAddress: string;
  createdAt: string;
  statusHistory: OrderStatus[];
  currentStatus: OrderStatus;
}

// Mock Restaurants Data
export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Burger Palace",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    coverImageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    openHours: "10:00 AM - 10:00 PM"
  },
  {
    id: "r2",
    name: "Pizza Heaven",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    coverImageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGl6emVyaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30-45 min",
    deliveryFee: "$1.99",
    address: "456 Elm St, Anytown, USA",
    phone: "(555) 987-6543",
    openHours: "11:00 AM - 11:00 PM"
  },
  {
    id: "r3",
    name: "Sushi Express",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    coverImageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGklMjByZXN0YXVyYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "40-55 min",
    deliveryFee: "$3.99",
    address: "789 Oak Ave, Anytown, USA",
    phone: "(555) 234-5678",
    openHours: "12:00 PM - 9:30 PM"
  },
  {
    id: "r4",
    name: "Taco Town",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGFjb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    coverImageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFjb3MlMjByZXN0YXVyYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.49",
    address: "101 Pine Rd, Anytown, USA",
    phone: "(555) 345-6789",
    openHours: "11:00 AM - 10:00 PM"
  },
  {
    id: "r5",
    name: "Curry House",
    imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    coverImageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "35-50 min",
    deliveryFee: "$2.99",
    address: "202 Cedar Blvd, Anytown, USA",
    phone: "(555) 456-7890",
    openHours: "12:00 PM - 10:30 PM"
  }
];

// Mock Menu Items by Restaurant
export const menuItems: MenuItem[] = [
  // Burger Palace
  {
    id: "bp1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and house sauce on a brioche bun",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r1"
  },
  {
    id: "bp2",
    name: "Bacon Deluxe Burger",
    description: "Angus beef patty with crispy bacon, swiss cheese, caramelized onions, and BBQ sauce",
    price: 10.99,
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmFjb24lMjBidXJnZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r1"
  },
  {
    id: "bp3",
    name: "Truffle Fries",
    description: "Crispy fries tossed in truffle oil and parmesan cheese",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e70989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r1"
  },
  {
    id: "bp4",
    name: "Chocolate Milkshake",
    description: "Creamy chocolate milkshake topped with whipped cream",
    price: 5.49,
    imageUrl: "https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwbWlsa3NoYWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r1"
  },
  
  // Pizza Heaven
  {
    id: "ph1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, fresh basil, and olive oil",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r2"
  },
  {
    id: "ph2",
    name: "Pepperoni Pizza",
    description: "Tomato sauce, mozzarella, and pepperoni slices",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r2"
  },
  {
    id: "ph3",
    name: "Garlic Bread",
    description: "Warm bread with garlic butter and herbs",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1619531038896-a4b83372ca0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r2"
  },
  {
    id: "ph4",
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
    price: 7.99,
    imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r2"
  },
  
  // Sushi Express
  {
    id: "se1",
    name: "California Roll",
    description: "Crab, avocado, cucumber, and tobiko",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbGlmb3JuaWElMjByb2xsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r3"
  },
  {
    id: "se2",
    name: "Salmon Nigiri",
    description: "Fresh salmon slices on seasoned rice (2 pieces)",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9uJTIwbmlnaXJpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r3"
  },
  {
    id: "se3",
    name: "Spicy Tuna Roll",
    description: "Spicy tuna, cucumber, and spring onion",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpY3klMjB0dW5hJTIwcm9sbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r3"
  },
  {
    id: "se4",
    name: "Miso Soup",
    description: "Traditional Japanese soup with tofu, seaweed, and green onion",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzbyUyMHNvdXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r3"
  },
  
  // Taco Town
  {
    id: "tt1",
    name: "Street Tacos",
    description: "Three corn tortillas with seasoned beef, onion, cilantro, and lime",
    price: 7.99,
    imageUrl: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3RyZWV0JTIwdGFjb3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r4"
  },
  {
    id: "tt2",
    name: "Chicken Quesadilla",
    description: "Large flour tortilla filled with grilled chicken, cheese, and peppers",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpY2tlbiUyMHF1ZXNhZGlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r4"
  },
  {
    id: "tt3",
    name: "Nachos Supreme",
    description: "Tortilla chips topped with beans, cheese, jalapeños, sour cream, and guacamole",
    price: 8.49,
    imageUrl: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmFjaG9zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r4"
  },
  {
    id: "tt4",
    name: "Churros",
    description: "Fried dough pastry with cinnamon sugar and chocolate dipping sauce",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1624374984106-82239d52c8d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2h1cnJvc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r4"
  },
  
  // Curry House
  {
    id: "ch1",
    name: "Butter Chicken",
    description: "Tender chicken pieces in a creamy tomato sauce with aromatic spices",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r5"
  },
  {
    id: "ch2",
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
    price: 11.99,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r5"
  },
  {
    id: "ch3",
    name: "Garlic Naan",
    description: "Soft Indian bread with garlic and butter",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1600343993668-d46116cf6b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwbmFhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r5"
  },
  {
    id: "ch4",
    name: "Mango Lassi",
    description: "Refreshing yogurt drink with mango puree and cardamom",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1605270012917-bf357a1fdf2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ28lMjBsYXNzaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    restaurantId: "r5"
  }
];

// Mock orders data
export const orders: Order[] = [
  {
    id: "o1",
    userId: "123456",
    restaurantId: "r1",
    restaurantName: "Burger Palace",
    items: [
      {
        id: "bp1",
        name: "Classic Cheeseburger",
        price: 8.99,
        quantity: 2
      },
      {
        id: "bp3",
        name: "Truffle Fries",
        price: 4.99,
        quantity: 1
      }
    ],
    totalPrice: 22.97,
    deliveryAddress: "123 Main St, Apt 4B, Anytown, USA",
    createdAt: "2023-08-10T14:30:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2023-08-10T14:30:00Z"
      },
      {
        status: "confirmed",
        timestamp: "2023-08-10T14:32:00Z"
      },
      {
        status: "preparing",
        timestamp: "2023-08-10T14:40:00Z"
      },
      {
        status: "out_for_delivery",
        timestamp: "2023-08-10T15:15:00Z"
      },
      {
        status: "delivered",
        timestamp: "2023-08-10T15:45:00Z"
      }
    ],
    currentStatus: {
      status: "delivered",
      timestamp: "2023-08-10T15:45:00Z"
    }
  },
  {
    id: "o2",
    userId: "123456",
    restaurantId: "r3",
    restaurantName: "Sushi Express",
    items: [
      {
        id: "se1",
        name: "California Roll",
        price: 8.99,
        quantity: 1
      },
      {
        id: "se2",
        name: "Salmon Nigiri",
        price: 6.99,
        quantity: 2
      },
      {
        id: "se4",
        name: "Miso Soup",
        price: 3.49,
        quantity: 1
      }
    ],
    totalPrice: 26.46,
    deliveryAddress: "123 Main St, Apt 4B, Anytown, USA",
    createdAt: "2023-08-15T19:20:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2023-08-15T19:20:00Z"
      },
      {
        status: "confirmed",
        timestamp: "2023-08-15T19:25:00Z"
      },
      {
        status: "preparing",
        timestamp: "2023-08-15T19:40:00Z"
      }
    ],
    currentStatus: {
      status: "preparing",
      timestamp: "2023-08-15T19:40:00Z"
    }
  }
];

// Helper function to get restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

// Helper function to get menu items for a restaurant
export const getMenuItemsByRestaurantId = (restaurantId: string): MenuItem[] => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

// Helper function to get orders by user ID
export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

// Helper function to get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

// Helper function to create a new order
export const createOrder = (
  userId: string,
  restaurantId: string,
  restaurantName: string,
  items: { id: string; name: string; price: number; quantity: number }[],
  totalPrice: number,
  deliveryAddress: string
): Order => {
  const now = new Date().toISOString();
  const newOrder: Order = {
    id: `o${orders.length + 1}`,
    userId,
    restaurantId,
    restaurantName,
    items,
    totalPrice,
    deliveryAddress,
    createdAt: now,
    statusHistory: [
      {
        status: 'pending',
        timestamp: now
      }
    ],
    currentStatus: {
      status: 'pending',
      timestamp: now
    }
  };
  
  orders.push(newOrder);
  return newOrder;
};
