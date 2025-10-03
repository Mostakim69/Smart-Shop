"use client";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { total } = useCart();

  return (
    <div className="p-5 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Promo Code</label>
        <div className="flex gap-2 mt-2">
          <input type="text" className="border p-2 flex-1 rounded" placeholder="Enter promo" />
          <button className="bg-blue-600 text-white px-4 rounded">Apply</button>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="flex justify-between"><span>Subtotal:</span> <span>${total}</span></p>
        <p className="flex justify-between"><span>Shipping:</span> <span>Free</span></p>
        <p className="flex justify-between"><span>Tax:</span> <span>${(total * 0.02).toFixed(2)}</span></p>
      </div>

      <div className="border-t mt-4 pt-4 font-bold text-lg flex justify-between">
        <span>Total:</span> <span>${(total * 1.02).toFixed(2)}</span>
      </div>

      <button className="w-full bg-orange-600 text-white mt-6 py-3 rounded">Place Order</button>
    </div>
  );
}
