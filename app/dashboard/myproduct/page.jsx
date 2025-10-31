import React from "react";

export default function MyProductPage() {
  const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const orders = [{
    id: 1, items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
    address: {
      firstName: "Mostakim", lastName: "Hosen", street: "123 Main St", city: "Gazipur", state: "Dhaka", zipcode: "10001", country: "Bangladesh",
    },
    amount: 320.0, paymentType: "Credit Card", orderDate: "10/10/2022", isPaid: true,
  },
  {
    id: 2, items: [{ product: { name: "Adidas Ultraboost" }, quantity: 2 }], address: { firstName: "Talha", lastName: "Tarique", street: "Saidpur", city: "Saidpur", state: "Rangpur", zipcode: "90001", country: "Bangladesh", },
    amount: 450.0, paymentType: "PayPal", orderDate: "11/15/2022", isPaid: false,
  },
  ];

  return (
    <div className="md:p-10 p-4 space-y-6 bg-gray-50 min-h-screen"> <h2 className="text-2xl font-semibold text-gray-800">📦 Orders List</h2> <div className="space-y-5"> {orders.map((order) => (<div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="grid md:grid-cols-[2fr_2fr_1fr_1fr] gap-6 items-center">
        {/* Product Section */}
        <div className="flex items-center gap-4">
          <img className="w-14 h-14 object-contain bg-gray-100 p-2 rounded-lg" src={boxIcon} alt="Product" />
          <div> {order.items.map((item, i) => (<p key={i} className="text-gray-800 font-medium text-lg"> {item.product.name} <span className={`ml-2 text-indigo-600 text-sm ${item.quantity < 2 && "hidden"}`} > x {item.quantity} </span> </p>))} <p className="text-sm text-gray-500">Order ID: #{order.id}</p> </div>
        </div>
        {/* Shipping Address */}
        <div className="text-sm leading-relaxed text-gray-700">
          <p className="font-semibold text-base mb-1">
            {order.address.firstName} {order.address.lastName}
          </p>
          <p className="text-gray-500">
            {order.address.street}, {order.address.city},{" "}
            {order.address.state} {order.address.zipcode},{" "}
            {order.address.country}
          </p>
        </div>

        {/* Amount */}
        <div className="flex flex-col items-start md:items-center">
          <p className="text-lg font-semibold text-gray-900">
            ${order.amount.toFixed(2)}
          </p>
          <span
            className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${order.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {order.isPaid ? "✅ Paid" : "⏳ Pending"}
          </span>
        </div>

        {/* Payment Info */}
        <div className="text-sm text-gray-600 space-y-1 text-left md:text-right">
          <p>
            <span className="font-medium">Method:</span>{" "}
            {order.paymentType}
          </p>
          <p>
            <span className="font-medium">Date:</span> {order.orderDate}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}  {order.isPaid ? "Completed" : "Awaiting Payment"}
          </p>
        </div>
      </div>
    </div>
    ))}
    </div>
    </div>
  );
}
