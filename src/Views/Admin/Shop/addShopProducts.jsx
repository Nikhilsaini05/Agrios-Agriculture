import { SupabaseClient } from '@supabase/supabase-js';
import { Plus, X, Upload, ShoppingBag, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../../Backend/supabase_client';

export default function AddShopProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [expandedProductId, setExpandedProductId] = useState(null);

    const initialFormState = {
        Product_Name: '',
        Description: '',
        Brand_Name: 'Agrios',
        Category: '',
        Base_Prise: '',
        Selling_Prise: '',
        Product_Image: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Product_Name || !formData.Selling_Prise) {
            return alert("Fill Name and Price");
        }
        

        // UPLOAD IMAGE TO STORAGE
        const fileName = `${Date.now()}-${formData.Product_Image.name}`;

        const { error: uploadError } = await supabase.storage
            .from('ProductTableImages')
            .upload(fileName, formData.Product_Image);

        if (uploadError) {
            console.error(uploadError);
            return alert("Image upload failed: " + uploadError.message);
        }

        // GET PUBLIC URL
        const { data: publicUrlData } = supabase.storage
            .from('ProductTableImages')
            .getPublicUrl(fileName);

        const publicImageUrl = publicUrlData.publicUrl;

        // INSERT INTO DATABASE
        const { data, error } = await supabase
            .from('ProductTable')
            .insert([
                {
                    Product_Name: formData.Product_Name,
                    Description: formData.Description,
                    Brand_Name: formData.Brand_Name,
                    Category: formData.Category,
                    Base_Prise: formData.Base_Prise,
                    Selling_Prise: formData.Selling_Prise,
                    Product_Image: publicImageUrl
                }
            ])
            .select();

        if (error) {
            console.log(error);
            alert("Error saving product");
            return;
        }

        alert("Product Added Successfully");

        setProducts([data[0], ...products]);

        setFormData(initialFormState);
    };

    // Fetch product lists on load
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('ProductTable')
            .select('*')
            .order('id');

        if (!error) {
            setProducts(data);
        }
    };

    // Fetch live categories from the "Servies" database table
    useEffect(() => {
        const fetchShopCategories = async () => {
            const { data, error } = await supabase
                .from('Servies')
                .select('*')
                .order('id');

            if (!error && data) {
                setCategories(data);
            } else {
                console.error("Error fetching categories:", error);
            }
        };

        fetchShopCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);

            setFormData({
                ...formData,
                Product_Image: file,
                imagePreview: previewUrl
            });
        }
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
                                <input type="text" placeholder="Product Name" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.Product_Name} onChange={(e) => setFormData({ ...formData, Product_Name: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Short Description</label>
                                <textarea placeholder="Describe in short" className="p-3 bg-[#F7F2EC] rounded-xl h-24 outline-none" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Brand Name</label>
                                <input type="text" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.Brand_Name} readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-[#5F0D24]">Product Media</h2>
                        <div className="w-32 h-32 border-2 border-dashed border-[#F2E4D8] rounded-2xl flex items-center justify-center relative cursor-pointer overflow-hidden">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                            {formData.imagePreview ? <img src={formData.imagePreview} className="w-full h-full object-cover" /> : <Upload className="text-[#5F0D24]" />}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2E4D8]">
                        <h2 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-widest">Category</h2>
                        <select
                            className="w-full p-3 bg-[#F7F2EC] rounded-xl outline-none"
                            value={formData.Category}
                            onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
                        >
                            <option value="">Select Category</option>

                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.Product_Name}
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
                                <input type="number" placeholder="0.00" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.Base_Prise} onChange={(e) => setFormData({ ...formData, Base_Prise: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Selling Price (₹)</label>
                                <input type="number" placeholder="0.00" className="p-3 bg-[#F7F2EC] rounded-xl outline-none" value={formData.Selling_Prise} onChange={(e) => setFormData({ ...formData, Selling_Prise: e.target.value })} />
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

                            {item.Product_Image && (
                                <img
                                    src={item.Product_Image}
                                    className="h-44 w-full object-cover"
                                    alt={item.Product_Name}
                                />
                            )}
                            <div className="p-4 text-left">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.Category}</span>
                                <h3 className="font-bold text-[#5F0D24] text-lg mt-1">{item.Product_Name}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <p className="text-[#2D5A27] font-bold text-xl">₹{item.Selling_Prise}</p>
                                    {item.Base_Prise && (
                                        <p className="text-gray-400 text-sm line-through">₹{item.Base_Prise}</p>
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
                                        {item.Description || "No description provided."}
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