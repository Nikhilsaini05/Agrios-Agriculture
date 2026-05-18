import React from 'react'

export default function Order() {

    // Mock data for the table rows
    const orders = [
        { id: "#AG-9481", customer: "Rohan", date: "May 16, 2026 09:05 AM", items: "3 Items", payment: "Paid", status: "Processing" },
        { id: "#AG-9482", customer: "Rohit", date: "May 16, 2026 09:05 AM", items: "2 Items", payment: "Paid", status: "Processing" },
        { id: "#AG-9483", customer: "Ajay", date: "May 16, 2026 09:05 AM", items: "1 Item", payment: "Pending", status: "Shipped" },
        { id: "#AG-9484", customer: "Vijay", date: "May 16, 2026 09:05 AM", items: "3 Items", payment: "Paid", status: "Delivered" },
        { id: "#AG-9485", customer: "Bunty", date: "May 16, 2026 09:05 AM", items: "1 Item", payment: "Paid", status: "Shipped" },
        { id: "#AG-9486", customer: "Raju", date: "May 16, 2026 09:05 AM", items: "1 Item", payment: "Pending", status: "Shipped" },
        { id: "#AG-9487", customer: "Sunil", date: "May 16, 2026 09:05 AM", items: "2 Item", payment: "Paid", status: "Delivered" },
        { id: "#AG-9488", customer: "Karan", date: "May 16, 2026 09:05 AM", items: "1 Item", payment: "Paid", status: "Shipped" },
    ];

    return (
        <div className="min-h-screen bg-[#F7F2EC] p-4 md:p-6 text-left">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                    <h1 className="text-2xl font-bold text-[#5F0D24]">Order List</h1>
                    <p className="text-gray-500 text-sm tracking-tight">All Current Order Details are Show Below</p>
                </div>
                <div className="flex gap-3">
                    {/* <button
                        className="px-6 py-2 border border-[#5F0D24] text-[#5F0D24] rounded-full font-medium cursor-pointer shadow-md active:scale-95 transition-all">
                        Reject
                    </button>
                    <button
                        className="px-6 py-2 bg-[#5F0D24] text-white rounded-full font-medium cursor-pointer shadow-md active:scale-95 transition-all">
                        Accept All
                    </button> */}
                </div>
            </div>

            {/* total order , pending , shipping , revenue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-gray-300 bg-[#FFFDFB] shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Total Orders:</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1,250</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-300 bg-[#FFFDFB] shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Pending Fulfillment:</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-300 bg-[#FFFDFB] shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Shipped Today:</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">210</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-300 bg-[#FFFDFB] shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Revenue (May):</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">12,4500.00</p>
                </div>
            </div>

            {/* The Order Table Content Section */}
            <div className="bg-[#FFFDFB] border border-gray-300 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-200 border-collapse text-left text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300 font-semibold text-gray-900">
                                <th className="p-4 w-12 text-center">
                                    <input type="checkbox" className="rounded border-gray-300 accent-[#5F0D24]" />
                                </th>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer Name</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50/70 transition-colors">
                                    <td className="p-4 text-center">
                                        <input type="checkbox" className="rounded border-gray-300 accent-[#5F0D24]" />
                                    </td>
                                    <td className="p-4 font-medium text-[#5F0D24] underline cursor-pointer">{order.id}</td>
                                    <td className="p-4 text-gray-900 font-medium">{order.customer}</td>
                                    <td className="p-4 text-gray-500">{order.date}</td>
                                    <td className="p-4">{order.items}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold text-white tracking-wide ${order.status === 'Processing' ? 'bg-amber-500' :
                                                order.status === 'Shipped' ? 'bg-blue-600' : 'bg-green-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-3 text-gray-600">
                                            <button className="hover:text-[#5F0D24] cursor-pointer" title="View">👁️</button>
                                            <button className="hover:text-[#5F0D24] cursor-pointer" title="Print">🖨️</button>
                                            <button className="hover:text-[#5F0D24] cursor-pointer font-bold" title="More">•••</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 

                {/* Table Footer - Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-gray-300 bg-gray-50/50">
                    <p className="text-xs text-gray-500 font-medium">Showing 1-10 of 125 entries</p>
                    <div className="flex items-center gap-1 text-xs ">
                        <button className="px-3 py-1.5 cursor-pointer border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 font-medium text-gray-600 transition-colors">
                            &lt; Previous
                        </button>
                        <button className="px-3 py-1.5 cursor-pointer border border-gray-300 rounded-md bg-[#5F0D24] text-white font-bold shadow-sm">
                            1
                        </button>
                        <button className="px-3 py-1.5 cursor-pointer border border-gray-300 rounded-md bg-white hover:bg-gray-100 font-medium text-gray-600 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1.5 cursor-pointer border border-gray-300 rounded-md bg-white hover:bg-gray-100 font-medium text-gray-600 transition-colors">
                            3
                        </button>
                        <span className="px-1 text-gray-400">...</span>
                        <button className="px-3 py-1.5 cursor-pointer  border border-gray-300 rounded-md bg-white hover:bg-gray-100 font-medium text-gray-600 transition-colors">
                            Next &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}