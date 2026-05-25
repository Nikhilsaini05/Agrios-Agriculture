import React from 'react';
import { ArrowLeft, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function CartItems() {
    const items = [
        {
            id: 1,
            image: "../../../public/Images/Apples.jpg",
            itemName: "Apple",
            price: "$100",
            type: "Fruit    ",
            quantity: 2
        },
        {
            id: 2,
            image: "../../../public/Images/Apples.jpg",
            itemName: "Apple",
            price: "$100",
            type: "Fruit    ",
            quantity: 2
        },
        {
            id: 3,
            image: "../../../public/Images/Apples.jpg",
            itemName: "Apple",
            price: "$100",
            type: "Fruit    ",
            quantity: 2
        },
    ];

    return (
        <div className="min-h-screen bg-[#edecea] flex items-center justify-center mt-30 p-4 sm:p-10">
            {/* Main Container */}
            <main className="w-full max-w-6xl bg-white rounded-3xl text-left shadow-xl grid grid-cols-1 lg:grid-cols-3 overflow-hidden">

                {/* Left Side: Shopping Cart List */}
                <div className="lg:col-span-2 p-6 sm:p-10">
                    {/* Go Back Link */}
                    <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-gray-900 transition mb-8 w-fit">
                        <ArrowLeft size={20} className="stroke-[3]" />
                        <span className="font-semibold text-lg">Shopping Continue</span>
                    </div>

                    <hr className="border-gray-200 mb-6" />

                    {/* Header Info */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Shopping cart</h1>
                        <p className="text-sm text-gray-500 mt-1">You have {items.length} items in your cart</p>
                    </div>

                    {/* Items Map */}
                    <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                {/* Image and Details Group */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.itemName}
                                        className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">{item.itemName}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
                                    </div>
                                </div>

                                {/* Quantity and Actions Group */}
                                <div className="flex items-center gap-8">
                                    {/* Quantity Controller */}
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-800 text-lg w-4 text-center">{item.quantity}</span>
                                        <div className="flex flex-col text-gray-400">
                                            <button className="hover:text-gray-700"><ChevronUp size={16} /></button>
                                            <button className="hover:text-gray-700"><ChevronDown size={16} /></button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <span className="font-bold text-gray-800 w-16 text-right">{item.price}</span>

                                    {/* Delete Button */}
                                    <button className="text-gray-400 hover:text-red-500 transition">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Card Details Checkout Panel */}
                <div className="bg-[#4f46e5] text-white p-6 sm:p-8 flex flex-col justify-between lg:m-4 lg:rounded-2xl">
                    <div>
                        {/* Title & User Profile Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Card Details</h2>
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                                alt="User Profile"
                                className="w-10 h-10 rounded-xl object-cover border border-white/20"
                            />
                        </div>

                        {/* Card Types Selection */}
                        <div className="mb-6">
                            <label className="text-xs text-indigo-200 block mb-2 font-medium">Card type</label>
                            <div className="flex gap-2">
                                <div className="bg-indigo-700/50 p-2 rounded-lg border border-indigo-400/30 w-14 h-9 flex items-center justify-center font-bold text-xs">Master</div>
                                <div className="bg-indigo-700/20 p-2 rounded-lg border border-transparent w-14 h-9 flex items-center justify-center font-bold text-xs text-indigo-200">Visa</div>
                                <div className="bg-indigo-700/20 p-2 rounded-lg border border-transparent w-14 h-9 flex items-center justify-center font-bold text-xs text-indigo-200">RuPay</div>
                                <button className="bg-indigo-700/40 px-3 py-1 rounded-lg text-xs hover:bg-indigo-600 transition ml-auto">See all</button>
                            </div>
                        </div>

                        {/* Inputs Form */}
                        <form className="space-y-4">
                            <div>
                                <label className="text-xs text-indigo-200 block mb-1 font-medium">Name on card</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-indigo-700/40 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-sm placeholder-indigo-300 focus:outline-none focus:border-indigo-300 transition"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-indigo-200 block mb-1 font-medium">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1111 2222 3333 4444"
                                    className="w-full bg-indigo-700/40 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-sm placeholder-indigo-300 focus:outline-none focus:border-indigo-300 transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-indigo-200 block mb-1 font-medium">Expiration date</label>
                                    <input
                                        type="text"
                                        placeholder="dd/mm/yy"
                                        className="w-full bg-indigo-700/40 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-sm placeholder-indigo-300 focus:outline-none focus:border-indigo-300 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-indigo-200 block mb-1 font-medium">CVV</label>
                                    <input
                                        type="password"
                                        maxLength="8"
                                        placeholder="123"
                                        className="w-full bg-indigo-700/40 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-sm placeholder-indigo-300 focus:outline-none focus:border-indigo-300 transition"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Pricing Totals & Checkout Button */}
                    <div className="mt-8 pt-6 border-t border-indigo-500/30 space-y-2">
                        <div className="flex justify-between text-sm text-indigo-200">
                            <span>Subtotal</span>
                            <span>$1,668</span>
                        </div>
                        <div className="flex justify-between text-sm text-indigo-200">
                            <span>Shipping</span>
                            <span>$4</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-white pt-2">
                            <span>Total (Tax incl.)</span>
                            <span>$1,672</span>
                        </div>

                        {/* Checkout CTA */}
                        <button className="w-full bg-[#10b981] hover:bg-[#059669] text-white rounded-xl py-3 px-4 mt-4 font-bold flex justify-between items-center transition shadow-lg shadow-emerald-900/20">
                            <span>$1,672</span>
                            <span className="flex items-center gap-1">
                                Checkout <span>→</span>
                            </span>
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}