import React, { useState, useEffect } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { supabase } from '../../../Backend/supabase_client';

export default function Add_products() {

    const [categories, setCategories] = useState([]);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const initialFormState = {
        Product_Name: '',
        Image: null,
        preview: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    // FETCH DATA
    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {

        const { data, error } = await supabase
            .from('Servies')
            .select('*')
            .order('id');

        if (error) {
            console.log(error);
        } else {
            setCategories(data);
        }
    };

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

    // INPUT CHANGE
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            Product_Name: e.target.value
        });
    };

    // IMAGE CHANGE
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onloadend = () => {

                setFormData({
                    ...formData,
                    Image: file,
                    preview: reader.result
                });

            };

            reader.readAsDataURL(file);
        }
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.Product_Name || !formData.Image) {
            return alert("Please add name and image");
        }

        // UPLOAD IMAGE TO STORAGE
        const fileName = `${Date.now()}-${formData.Image.name}`;

        const { error: uploadError } = await supabase.storage
            .from('agrios_images')
            .upload(fileName, formData.Image);

        if (uploadError) {
            console.log(uploadError);
            return alert("Image upload failed");
        }

        // GET PUBLIC URL
        const { data: publicUrlData } = supabase.storage
            .from('agrios_images')
            .getPublicUrl(fileName);

        const imageUrl = publicUrlData.publicUrl;

        // INSERT INTO DATABASE
        const { error } = await supabase
            .from('Servies')
            .insert([
                {
                    Product_Name: formData.Product_Name,
                    Image: imageUrl
                }
            ]);

        if (error) {
            console.log(error);
            return alert("Error saving product");
        }

        alert("Category Added Successfully");

        setFormData(initialFormState);

        setIsFormOpen(false);

        fetchCategory();
    };

    // DELETE
    const deleteCategory = async (id) => {

        const { error } = await supabase
            .from('Servies')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchCategory();
        }
    };

    return (
        <div className="p-4">

            <div className='flex justify-between mx-8 py-3 items-center border-b border-[#F2E4D8]'>

                <h1 className='text-[16px] font-bold'>
                    Categories
                </h1>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className='bg-[#5F0D24] text-[16px] py-1.5 px-4 rounded-3xl text-white flex items-center gap-2'
                >
                    <Plus size={18} />
                    add Category
                </button>

            </div>

            {isFormOpen && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-[#F7F2EC] p-8 rounded-2xl w-full max-w-md relative">

                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-xl font-bold mb-6 text-[#5F0D24]">
                            Create New Category
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                        >

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg border border-[#F2E4D8]"
                                    value={formData.Product_Name}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Product Media
                                </label>

                                <div className="border-2 border-dashed border-[#F2E4D8] rounded-lg p-6 flex flex-col items-center relative bg-white">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />

                                    {formData.preview ? (
                                        <img
                                            src={formData.preview} 
                                            alt="Preview"
                                            className="h-32 w-full object-contain"
                                        />
                                    ) : (

                                        <>
                                            <Upload className="text-[#5F0D24] mb-2" />
                                            <span className="text-xs text-gray-500">
                                                Upload high-quality images
                                            </span>
                                        </>

                                    )}

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="bg-[#5F0D24] text-white py-3 rounded-lg font-bold"
                            >
                                Save Category
                            </button>

                        </form>

                    </div>

                </div>

            )}

            {/* DISPLAY DATA */}
            <div className="mx-8 mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {categories.map((cat) => (

                    <div
                        key={cat.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-[#F2E4D8] group relative"
                    >

                        <button
                            onClick={() => deleteCategory(cat.id)}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full"
                        >
                            <X size={14} />
                        </button>

                        <div className="h-32 w-full bg-[#F7F2EC] rounded-lg mb-3 overflow-hidden">

                            <img
                                src={cat.Image}
                                alt={cat.Product_Name}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        <h3 className="text-center font-semibold text-[#5F0D24]">
                            {cat.Product_Name}
                        </h3>

                    </div>

                ))}

            </div>

        </div>
    );
}