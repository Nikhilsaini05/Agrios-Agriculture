/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '../../Backend/supabase_client';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartitems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (qlt = 1) => {
        console.log("Context state changing! Adding:", qlt);
        setCartCount((prev) => prev + qlt);
    };

    // FETCH CART ITEMS FROM SUPABASE
    const fetchCartitems = async () => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*');

            if (error) throw error;
            setCartItems(data || []);
        } catch (error) {
            console.error("error in fetch items", error.message);
        }
    };

    // REMOVE ITEM
    const deleteCartItem = async (id) => {
        try {
            const { error } = await supabase
                .from('carts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Deletion target error:", error.message);
        }
    };

    // 1. FIXED INCREASE QUANTITY 
const increaseQty = (id) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            const currentQty = parseInt(item.Quantity, 10) || 0;
            return { ...item, Quantity: currentQty + 1 };
        }
        return item;
    }));
};

// 2. FIXED DECREASE QUANTITY
const decreaseQty = (id) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            const currentQty = parseInt(item.Quantity, 10) || 0;
            return { ...item, Quantity: currentQty > 1 ? currentQty - 1 : 1 };
        }
        return item;
    }));
};

// 3. FIXED TOTAL AMOUNT 
const getCartTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < cartitems.length; i++) {
        const e = cartitems[i];
        
        const price = parseFloat(e.Total_Prise || e.Total_Price || 0);
        const qty = parseInt(e.Quantity, 10) || 0;

        total += qty * price;
    }
    return total;
};

    // // CALCULATE TAXES 
    // const calculateTaxes = () => {
    //     let totalTax = 0;
    //     for (let i = 0; i < cartitems.length; i++) {
    //         const e = cartitems[i];
    //         let tax = 0;

    //         if (e.hsn === hsnData.fivePercent) {
    //             tax = (e.Quantity * e.Total_Prise) * 5 / 100;
    //         }
    //         if (e.hsn === hsnData.eighteenPercent) {
    //             tax = (e.Quantity * e.Total_Prise) * 18 / 100;
    //         }
    //         totalTax += tax;
    //     }
    //     return totalTax;
    // };

    // CALCULATE SHIPPING/DELIVERY
    const calculateDeliveryCharges = () => {
        const highestCharge = 120;
        let totalDeliveryCharges = 0;

        for (let i = 0; i < cartitems.length; i++) {
            const e = cartitems[i];
            totalDeliveryCharges += e.deliveryCharges || 0; 
        }

        return totalDeliveryCharges > highestCharge ? highestCharge : totalDeliveryCharges;
    };

    return (
        <CartContext.Provider value={{ 
            cartitems, 
            cartCount, 
            addToCart, 
            fetchCartitems, 
            deleteCartItem, 
            increaseQty, 
            decreaseQty,
            getCartTotalAmount, 
            // calculateTaxes, 
            calculateDeliveryCharges 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);