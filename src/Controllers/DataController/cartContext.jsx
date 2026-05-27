/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Children, createContext, useContext, useState } from "react";
import { supabase } from '../../Backend/supabase_client';

const CartContext = createContext();


const hsnData = {
    fivePercent : "642536",
    eighteenPercent: "896542"
}

export const CartProvider = ({ children }) => {
    const [cartitems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Inside cartContext.jsx
    const addToCart = (qlt = 1) => {
        console.log("Context state changing! Adding:", qlt);
        setCartCount((prev) => prev + qlt);
    };


    const fetchCartitems = async () => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')

            if (error) throw error;
            setCartItems(data || [])
        } catch (error) {
            console.error("error  in fatch items", error.message);
        }
    }

    //  REMOVE ITEM
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


    const increaseQty = (index) => {
        cartitems[index].Quantity++;
    }


    const getCartTotalAmount = () => {

        let total = 0;

        for (let i = 0; i < cartitems.length; i++) {
            const e = cartitems[i];

            const itemTotalPrice = e.Quantity * e.Total_Prise;

            total = total + itemTotalPrice;

        }

        return total;
    }


        /// Hsn : 605684 (5%)
        /// hsn : 798465 (18%)


    const calculateTaxes = () => {

       let totalTax = 0;

       for (let i = 0; i < cartitems.length; i++) {
        const e = cartitems[i];

        let tax = 0; 

        if(e.hsn === hsnData.fivePercent){
           tax = (e.Quantity * e.Total_Prise) * 5 /100;
        }
        
        if(e.hsn === hsnData.eighteenPercent){
            tax = (e.Quantity * e.Total_Prise) * 18 /100;
        }

        totalTax += tax;
        
       }

    }


    

    const calculateDeliveryCharges = ()=> {

        const heghestCharge = 120;

        let totalDeliveryCharges = 0;

        for (let i = 0; i < cartitems.length; i++) {
            const e = cartitems[i];

            totalDeliveryCharges += e.deliveryCharges;
            
        }

        return totalDeliveryCharges > heghestCharge ? heghestCharge : totalDeliveryCharges;

    }


    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);

