import { EyeIcon, TruckIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";


async function getOrders() {
 
  return [
    { id: "ORD123", date: "2025-10-05", total: "$120", status: "Delivered" },
    { id: "ORD124", date: "2025-10-07", total: "$80", status: "Pending" },
    { id: "ORD125", date: "2025-10-10", total: "$60", status: "Shipped" },
  ];
}

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛍️ My Orders</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">Order ID</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Total</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-medium text-gray-800">{o.id}</td>
                  <td className="p-4 text-gray-600">{o.date}</td>
                  <td className="p-4 text-gray-800 font-semibold">{o.total}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {o.status === "Delivered" && <CheckCircleIcon className="w-4 h-4" />}
                      {o.status === "Pending" && <ClockIcon className="w-4 h-4" />}
                      {o.status === "Shipped" && <TruckIcon className="w-4 h-4" />}
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition">
                      <EyeIcon className="w-4 h-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    
        <div className="md:hidden space-y-4 p-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{o.id}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    o.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : o.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">📅 {o.date}</p>
              <p className="text-gray-800 font-semibold mt-1">💰 {o.total}</p>
              <button className="mt-3 w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                <EyeIcon className="w-4 h-4" /> View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
