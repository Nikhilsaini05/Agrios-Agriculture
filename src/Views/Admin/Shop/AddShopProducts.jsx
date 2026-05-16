import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, ShoppingBag, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function AddShopProducts() {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem("agrios_products");
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("agrios_categories");
        return saved ? JSON.parse(saved) : [];
    });

    const [expandedProductId, setExpandedProductId] = useState(null);

    const initialFormState = {
        name: '', shortDesc: '', brand: 'Agrios',
        category: '', basePrice: '', sellingPrice: '', preview: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        localStorage.setItem("agrios_products", JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        const handleStorageUpdate = () => {
            const saved = localStorage.getItem("agrios_categories");
            if (saved) setCategories(JSON.parse(saved));
        };
        window.addEventListener('storage', handleStorageUpdate);
        return () => window.removeEventListener('storage', handleStorageUpdate);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, preview: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.sellingPrice) return alert("Fill Name and Price");

        const newProduct = { ...formData, id: Date.now() };
        setProducts([newProduct, ...products]);
        setFormData(initialFormState);
    };

    const removeProduct = (id) => {
        if (window.confirm("Remove this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const toggleDescription = (id) => {
        setExpandedProductId(expandedProductId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#F7F2EC] p-4 md:p-8 text-left">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                    <h1 className="text-2xl font-bold text-[#5F0D24]">Add New Product</h1>
                    <p className="text-gray-500 text-sm tracking-tight">Fill details to list a new product.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setFormData(initialFormState)} 
                    className="px-6 py-2 border border-[#5F0D24] text-[#5F0D24] rounded-full font-medium cursor-pointer shadow-md active:scale-95 transition-all">
                        Cancel</button>
                    <button onClick={handleSubmit} 
                    className="px-6 py-2 bg-[#5F0D24] text-white rounded-full font-medium cursor-pointer shadow-md active:scale-95 transition-all">
                        Publish Product</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-[#5F0D24]">Basic Information</h2>
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Product Name</label>
                                <input type="text" placeholder="Product Name" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Short Description</label>
                                <textarea placeholder="Describe in short" className="p-3 bg-[#F7F2EC] rounded-xl h-24 outline-none" value={formData.shortDesc} onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Brand Name</label>
                                <input type="text" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.brand} readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-[#5F0D24]">Product Media</h2>
                        <div className="w-32 h-32 border-2 border-dashed border-[#F2E4D8] rounded-2xl flex items-center justify-center relative cursor-pointer overflow-hidden">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                            {formData.preview ? <img src={formData.preview} className="w-full h-full object-cover" /> : <Upload className="text-[#5F0D24]" />}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Category</h2>
                        <select 
                            className="w-full p-3 bg-[#F7F2EC] rounded-xl outline-none" 
                            value={formData.category} 
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {/* --- UPDATED: Map through categories from localStorage --- */}
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* PRICING SECTION */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Pricing</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Base Price (₹)</label>
                                <input type="number" placeholder="0.00" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.basePrice} onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Selling Price (₹)</label>
                                <input type="number" placeholder="0.00" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM: Inventory Section --- */}
            <div className="mt-16 pt-8 border-t border-[#F2E4D8]">
                <div className="flex items-center gap-2 mb-8">
                    <ShoppingBag className="text-[#5F0D24]" />
                    <h2 className="text-2xl font-bold text-[#5F0D24]">Shop Inventory</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl border border-[#F2E4D8] shadow-sm relative group overflow-hidden">
                            <button onClick={() => removeProduct(item.id)} className="absolute top-3 right-3 z-10 bg-white/90 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>

                            <img src={item.preview} className="h-44 w-full object-cover" alt={item.name} />

                            <div className="p-4 text-left">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.category}</span>
                                <h3 className="font-bold text-[#5F0D24] text-lg mt-1">{item.name}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <p className="text-[#2D5A27] font-bold text-xl">₹{item.sellingPrice}</p>
                                    {item.basePrice && (
                                        <p className="text-gray-400 text-sm line-through">₹{item.basePrice}</p>
                                    )}
                                </div>
                                
                                <button
                                    onClick={() => toggleDescription(item.id)}
                                    className="w-full flex items-center justify-between text-xs font-bold text-[#5F0D24] py-2 px-3 bg-[#F7F2EC] rounded-lg hover:bg-[#F2E4D8] transition-colors"
                                >
                                    {expandedProductId === item.id ? "Description" : "Description"}
                                    {expandedProductId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                {expandedProductId === item.id && (
                                    <div className="mt-3 p-3 bg-white border border-[#F2E4D8] rounded-xl text-sm text-gray-600 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {item.shortDesc || "No description provided."}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}