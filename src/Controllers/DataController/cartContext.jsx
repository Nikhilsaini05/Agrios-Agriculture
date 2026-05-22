import { Children, createContext, useContext, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ Children }) => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (qlt = 1) => {
        setCartCount((perv) => perv + qlt);
    };

    return (
        <cartContext.Provider value={{ cartCount, addToCart }}>
            {Children}
        </cartContext.Provider>

    )
}

export const useCart = () => useContext(cartContext);

