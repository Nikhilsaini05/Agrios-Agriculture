import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Star, X, Plus, Minus, ShoppingCart, Backpack } from 'lucide-react';
import { RouteServices } from '../../Services/routes_services';
import { supabase } from '../../Backend/supabase_client';
import { useCart } from '../../Controllers/DataController/cartContext';


export default function ShopHome() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const pageLimit = 9;
    const { addToCart } = useCart();

    const gotoNextPage = async () => {

        await fetchProducts();
        setCurrentPage(currentPage + 1);
    }
    const gotoPreviousPage = async () => {

        await fetchProducts();
        setCurrentPage(currentPage - 1);
    }

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('ProductTable')
                .select('*, Servies(*) ')
                .range((currentPage * pageLimit), (currentPage * pageLimit) + pageLimit).limit(9);

            console.log(data);


            if (error) throw error;
            setProducts(data);
        } catch (error) {
            console.error("Error fetched inventory products", error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);


    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    return (
        <section className="w-full bg-white py-10 px-4 md:px-10 relative">
            <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

                {/* --- SIDEBAR --- */}
                <aside className="w-full md:w-1/4 space-y-8">
                    {/* Search Bar */}
                    <div className="bg-[#f2c050] p-1 md:p-2 lg:p-4 rounded-md">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full p-3 bg-transparent border-none placeholder-white text-white focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="hidden md:block border border-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Price</h3>
                        <input type="range" className="w-full accent-[#56b35a]" min="20" max="100" />
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-400 text-sm">$20 - $100</span>
                            <button className="bg-[#56b35a] text-white px-4 py-1 rounded text-sm font-semibold">Apply</button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="hidden md:block border border-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Categories</h3>
                        <ul className="space-y-4">
                            {['Agriculture', 'Farming', 'Fresh Vegetables', 'Harvest', 'Organic Food'].map((cat) => (
                                <li key={cat} className="flex justify-between items-center text-gray-500 hover:text-[#56b35a] cursor-pointer group">
                                    <span className="text-sm font-medium">{cat}</span>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#56b35a]" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <section className="w-full md:w-3/4">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-gray-500 text-sm">Showing 1–9 of 10 results</p>
                        <select className="border border-gray-200 rounded-md p-2 text-sm text-gray-500 outline-none">
                            <option>Default sorting</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    {/* Loading State UI Handler */}
                    {loading ? (
                        <div className="text-center py-20 text-gray-500 font-medium">Loading premium products...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((item) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer"
                                    onClick={() => openProductDetails(item)}
                                >
                                    <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center mb-4 bg-gray-50">

                                        <img
                                            src={item.Product_Image || item.img || "/Images/Apple.jpg"}
                                            alt={item.Product_Name}
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-left text-[24px] px-4">{item.Product_Name}</h4>
                                            <p className="text-[#56b35a] text-left text-[22px] font-bold mt-1 px-4 ">${(item.Selling_Prise ?? 0).toFixed(2)}</p>
                                        </div>
                                        <Star size={24} className="fill-[#f2c050] text-[#f2c050] mr-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Pagination */}
                    <div className='mt-6 flex justify-center gap-55'>
                        <button onClick={() => gotoPreviousPage()} className='bg-[#56b35a] text-white px-4 py-1 rounded text-sm font-semibold'>Prev. Page</button>
                        <button onClick={() => gotoNextPage()} className='bg-[#56b35a] text-white px-4 py-1 rounded text-sm font-semibold'>Next Page</button>
                    </div>

                </section>

            </main>

            {/* --- DETAILS POPUP MODAL --- */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
                    {/* Backdrop closer click zone */}
                    <div className="absolute inset-0" onClick={closePopup}></div>

                    {/* Modal Window Container */}
                    <div className="bg-white rounded-2xl max-w-2xl w-full mt-30 py-12 px-4 md:p-4 relative z-10 shadow-2xl flex flex-col md:flex-row gap-4 max-h-[92vh] overflow-y-auto text-left">

                        {/* Close Button Trigger */}
                        <button
                            type="button"
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full bg-white/80 backdrop-blur-sm md:bg-transparent hover:bg-gray-100 transition-colors z-20"
                        >
                            <X size={22} />
                        </button>

                        {/* Left Side: Product Image Display */}
                        <div className="w-full md:w-1/2 aspect-square md:max-h-none max-h-55 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                            <img
                                src={selectedProduct.Product_Image || selectedProduct.img || "/Images/Apple.jpg"}
                                alt={selectedProduct.Product_Name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply p-2"
                            />
                        </div>

                        {/* Right Side: Product Details Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h2 className="text-[12px] md:text-[24px] font-bold text-gray-900 mb-1">{selectedProduct.Product_Name}</h2>

                                <p className="text-[10px] md:text-[18px] font-black text-[#56b35a] mb-2">
                                    ${(selectedProduct.Selling_Prise ?? 0).toFixed(2)}
                                </p>

                                <p className="text-gray-600 text-[10px] md:text-[10px] leading-relaxed mb-2 ">
                                    {selectedProduct.Description}
                                </p>

                                {/* Review Section row */}
                                <div className="flex items-center justify-between gap-1 mb-2 md:mb-4 border-b border-gray-100 pb-2 ">
                                    <div className="flex gap-0.5 items-center w-full justify-between">
                                        <span className="text-[10px] md:text-xs text-gray-400">(Customer Reviews)</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(selectedProduct.rating || 5)].map((_, idx) => (
                                                <Star key={idx} size={14} className="fill-[#f2c050] text-[#f2c050]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls Action Box Layout */}
                            <div className="space-y-2">
                                <div className="space-y-2 bg-gray-50 p-1.5 rounded-xl">
                                    {/* Toggler Row */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700 font-bold text-[12px] md:text-[14px]">Quantity:</span>
                                        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                                            <button
                                                type="button"
                                                onClick={decreaseQty}
                                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-10 text-center text-[12px] font-bold text-gray-800">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={increaseQty}
                                                className="p-2 text-gray-500 hover:text-[#56b35a] hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Row */}
                                    <div className="flex items-center justify-between border-t border-gray-200/60 pt-2">
                                        <span className="text-gray-700 font-bold text-xs md:text-[14px]">Total Price:</span>
                                        <span className="text-xl md:text-[14px] font-black text-[#56b35a]">
                                            ${((selectedProduct.Selling_Prise ?? 0) * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Dynamic Action Button Set */}
                                <div className="flex flex-row md:flex-col gap-2 md:gap-2.5">
                                    <button
                                        type="button"
                                        onClick={async () => {
                                    try {

                                        const totalCalculatedPrice = ((selectedProduct.Selling_Prise ?? 0) * quantity).toFixed(2);
                                        const productImage = selectedProduct.productImage || Backpack.jpg ;

                                        const { error } = await supabase
                                            .from('carts')
                                            .insert([
                                                {
                                                    Image: productImage,
                                                    Item_Name: selectedProduct.Product_Name,
                                                    Total_Prise: `$${totalCalculatedPrice}`, 
                                                    Quantity: quantity.toString()            
                                                }
                                            ])
                                            .select();

                                        if (error) throw error;

                                        addToCart(quantity);
                                        closePopup();
                                    } catch (err) {
                                        console.error("Error adding item to cart database table:", err.message);
                                        alert("Failed to sync item to database cart: " + err.message);
                                    }
                                }}
                                className="flex-1 border-2 border-[#56b35a] text-[#56b35a] hover:bg-green-50/50 py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={16} />
                                Add To Cart
                            </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            alert(`Proceeding to checkout for ${quantity} ${selectedProduct.Product_Name}!`)
                                        }

                                        }
                                        className="flex-1 bg-[#56b35a] hover:bg-[#4aa04e] text-white py-1.5 md:py-2.5 px-2 md:px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-[0.98]"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}