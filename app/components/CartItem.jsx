"use client";

export default function CartItem({ item }) {
  return (
    <div className="flex items-center justify-between border-b pb-4 mb-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold">{item.name}</h2>
          <button className="text-red-500 text-sm">Remove</button>
        </div>
      </div>

      <p>${item.price}</p>

      <div className="flex items-center">
        <button>-</button>
        <span className="px-3">{item.quantity}</span>
        <button>+</button>
      </div>

      <p>${item.price * item.quantity}</p>
    </div>
  );
}
