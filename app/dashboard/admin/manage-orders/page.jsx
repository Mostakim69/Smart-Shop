import axios from "axios";
import ManageOrder from "../components/ManageOrder";

export default async function ManageOrders() {

  let orders = [];

  try {
    const res = await axios.get("https://smart-shop-server-three.vercel.app/orders");
    orders = res.data;
  } catch (error) {
    alert(error);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => <ManageOrder
              key={order._id}
              order={order}
              index={index}
            ></ManageOrder>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
