'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Define our cart item structure
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
  maxStock: number;
}

// Define our cart state
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

// Define possible actions for our cart
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Initial cart state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

// Helper functions to calculate totals
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

// Cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { quantity = 1, ...productData } = action.payload;
      const existingItem = state.items.find(item => item.id === productData.id);
      
      let updatedItems: CartItem[];
      
      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity, 
          existingItem.maxStock
        );
        
        updatedItems = state.items.map(item =>
          item.id === productData.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...productData,
          quantity: Math.min(quantity, productData.maxStock),
        };
        updatedItems = [...state.items, newItem];
      }
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxStock) }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    }
    
    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }
    
    case 'LOAD_CART': {
      const items = action.payload;
      return {
        ...state,
        items,
        total: calculateTotal(items),
        itemCount: calculateItemCount(items),
      };
    }
    
    default:
      return state;
  }
}

// Create the context
const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
} | null>(null);

// Cart Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bioethanol-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('bioethanol-cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bioethanol-cart', JSON.stringify(state.items));
  }, [state.items]);
  
  // Action functions
  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}