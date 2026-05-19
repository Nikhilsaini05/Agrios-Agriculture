import React, { useState } from 'react';
import { Search, ChevronRight, Star, X, Plus, Minus, ShoppingCart } from 'lucide-react'; 
import { RouteServices } from '../../Services/routes_services';

const products = [
    { id: 1, name: 'Apples', price: 50.00, img: '/Images/Apples.jpg', rating: 5, description: 'Fresh, crisp hand-picked orchard apples perfect for healthy snacks or sweet baking.' },
    { id: 2, name: 'Bananas', price: 20.00, img: '/Images/Bananas.jpg', rating: 5, description: 'Sweet and perfectly ripe organic bananas packed with natural vitamins and potassium.' },
    { id: 3, name: 'Carrot', price: 50.00, img: '/Images/Carrot.jpg', rating: 5, description: 'Crunchy, farm-fresh orange carrots ideal for healthy side dishes and fresh juices.' },
    { id: 4, name: 'Garlic', price: 20.00, img: '/Images/Garlic.jpg', rating: 5, description: 'Pungent, premium quality heirloom garlic bulbs to elevate your favorite culinary recipes.' },
    { id: 5, name: 'Grapes', price: 100.00, img: '/Images/Grapes.jpg', rating: 5, description: 'Plump, juicy seedless green grapes bursting with crisp, refreshing sweetness.' },
    { id: 6, name: 'Lettuce', price: 30.00, img: '/Images/Lettuce.jpg', rating: 5, description: 'Crisp, garden-fresh green lettuce leaves for crafting the perfect healthy dynamic salad.' },
    { id: 7, name: 'Onions', price: 20.00, img: '/Images/Onions.jpg', rating: 5, description: 'Freshly harvested robust red onions with a crisp texture and sharp profile.' },
    { id: 8, name: 'Potatoes', price: 30.00, img: '/Images/Potatos.jpg', rating: 5, description: 'Versatile, earth-grown starchy potatoes great for baking, roasting, or rustic frying.' },
    { id: 9, name: 'Red Grapes', price: 100.00, img: '/Images/RedGrapes.jpg', rating: 5, description: 'Rich, antioxidant-filled premium sweet red grapes harvested locally.' },
];

export default function ShopHome({ activePage, setActivePage }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

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

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((item) => (
                            <div 
                                key={item.id} 
                                className="group cursor-pointer"
                                onClick={() => openProductDetails(item)}
                            >
                                <div className="rounded-xl overflow-hidden aspect-square flex items-center justify-center mb-4 bg-gray-50">
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
                                    />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-[22px] px-4">{item.name}</h4>
                                        <p className="text-[#56b35a] font-bold mt-1 ">${item.price.toFixed(2)}</p>
                                    </div>
                                    <Star size={24} className="fill-[#f2c050] text-[#f2c050] mr-4" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button 
                            onClick={() => setActivePage(1)}
                            className={`w-10 h-10 rounded-md cursor-pointer font-bold transition-colors ${
                                activePage === 1 ? 'bg-[#56b35a] text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            1
                        </button>

                        <button 
                            onClick={() => setActivePage(2)}
                            className={`w-10 h-10 rounded-md cursor-pointer font-bold transition-colors ${
                                activePage === 2 ? 'bg-[#56b35a] text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            2
                        </button>

                        <button 
                            onClick={() => setActivePage(2)}
                            className="w-10 h-10 border border-gray-200 text-gray-500 rounded-md hover:bg-gray-50 flex items-center justify-center"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </section>
                
            </main>

            {/* --- DETAILS POPUP MODAL --- */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="absolute inset-0" onClick={closePopup}></div>
                    
                    <div className="bg-white rounded-2xl max-w-2xl w-full mt-30 p-6 md:p-4 relative z-10 shadow-2xl flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
                        
                        <button 
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full md:w-1/2 aspect-square bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                            <img 
                                src={selectedProduct.img} 
                                alt={selectedProduct.name} 
                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                        </div>

                        <div className="w-full md:w-1/2 flex text-left flex-col justify-between py-2">
                            <div> 
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                                

                                <p className="text-2xl font-black text-[#56b35a] mb-2">${selectedProduct.price.toFixed(2)}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-2">{selectedProduct.description}</p>
                            </div>
                                <div className="flex items-center justify-between gap-1 ">
                                    <span className="text-sm text-gray-400 mr-30">(Reviews)</span>
                                    {[...Array(selectedProduct.rating)].map((_, idx) => (
                                        <Star key={idx} size={18} className="fill-[#f2c050] text-[#f2c050]" />
                                    ))}
                                </div>

                            {/* Controls Wrapper */}
                            <div className="space-y-3 mt-4">
                                <div className="space-y-3 border-t border-b border-gray-100 py-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700 font-bold text-sm">Quantity:</span>
                                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                                            <button 
                                                onClick={decreaseQty}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                                            <button 
                                                onClick={increaseQty}
                                                className="p-2 text-gray-500 hover:text-[#56b35a] transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700 font-bold text-sm">Total Price:</span>
                                        <span className="text-2xl font-black text-[#56b35a]">
                                            ${(selectedProduct.price * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <button 
                                        onClick={() => alert(`Added ${quantity} ${selectedProduct.name} to cart!`)}
                                        className="flex-1 border-2 border-[#56b35a] text-[#56b35a] hover:bg-gray-50 py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        <ShoppingCart size={50} />
                                        Add To Cart
                                    </button>

                                    <button 
                                        onClick={() => alert(`Proceeding to checkout for ${quantity} ${selectedProduct.name}!`)}
                                        className="flex-1 bg-[#56b35a] hover:bg-[#4aa04e] text-xl text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
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