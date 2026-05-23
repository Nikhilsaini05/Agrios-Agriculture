import { Children, createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    // Inside cartContext.jsx
    const addToCart = (qlt = 1) => {
        console.log("Context state changing! Adding:", qlt);
        setCartCount((prev) => prev + qlt);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);

