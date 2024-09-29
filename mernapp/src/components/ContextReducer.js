import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.item];  // Add the item to the cart
      case "REMOVE":
        return state.filter((_, index) => index !== action.index);  // Remove item at specific index
      case "DROP":
        return [];  // Clear the cart
      default:
        return state;
    }
  };
  

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
