import React from 'react';

export default function AdminContact() {
    const inputClasses = "w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-maroon-500";
    const labelClasses = "block text-sm font-medium text-gray-500 ml-1";

    return (
        <div className="min-h-screen bg-[#FDF6F0] p-6 font-sans border-l-[3px] border-l-[#5F0D24]">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Manage your business contact information.</h1>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-2 border border-maroon-800 text-maroon-800 rounded-full font-medium hover:bg-maroon-50 cursor-pointer shadow-md active:scale-95 transition-all">
                        Cancel
                    </button>
                    <button className="px-8 py-2 bg-[#6B0D24] text-white rounded-full font-medium hover:bg-opacity-90 cursor-pointer shadow-md active:scale-95 transition-all">
                        Publish Changes
                    </button>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="space-y-6">

                {/* Business Details Section */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-left">
                            <label className={labelClasses}>Business Name</label>
                            <input type="text" placeholder="Business Name" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>Business Phone Number</label>
                            <input type="text" placeholder="+91 XXXXXXXXXX" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>Email Address</label>
                            <input type="email" placeholder="business@example.com" className={inputClasses} />
                        </div>
                    </div>

                    <div className="text-left mb-6">
                        <label className={labelClasses}>Business Description</label>
                        <textarea
                            rows="3"
                            placeholder="Describe your business in brief"
                            className={`${inputClasses} resize-none`}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-left">
                            <label className={labelClasses}>Whatsapp Number</label>
                            <input type="text" placeholder="+91" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>GST Number</label>
                            <input type="text" placeholder="e.g. 12ABCDE3456F1Z" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>Company CIN Number</label>
                            <input type="text" placeholder="e.g. U72900DL2020PTC123456" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-left">
                            <label className={labelClasses}>Address Line 1</label>
                            <input type="text" placeholder="House No., Building Name, Street" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>Address Line 2</label>
                            <input type="text" placeholder="Area, Landmark (optional)" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>Pin Code</label>
                            <input type="text" placeholder="e.g. 125000" className={inputClasses} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-left">
                            <label className={labelClasses}>City</label>
                            <input type="text" placeholder="e.g. Hisar" className={inputClasses} />
                        </div>
                        <div className="text-left">
                            <label className={labelClasses}>State</label>
                            <input type="text" placeholder="e.g. Haryana" className={inputClasses} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}