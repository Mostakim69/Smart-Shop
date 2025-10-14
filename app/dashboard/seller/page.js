import axios from "axios";

export default async function DashboardPage() {
  let stats = { totalSales: 0, orders: 0, productsListed: 0 };
  let orders = [];
  let products = [];

  try {
  const [statsRes, ordersRes, productsRes] = await Promise.all([
    axios.get("https://smart-shop-server-three.vercel.app/api/seller/stats"),
    axios.get("https://smart-shop-server-three.vercel.app/api/seller/orders"),
    axios.get("https://smart-shop-server-three.vercel.app/api/seller/products"),
  ]);

  stats = statsRes.data || stats;
  orders = ordersRes.data || [];
  products = productsRes.data || [];
} catch (error) {
  console.error("Error fetching dashboard data:", error.response?.status, error.message);
  stats = { totalSales: 0, orders: 0, productsListed: 0 };
  orders = [];
  products = [];
}


  return (
    <div className="font-display bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <div className="flex h-full">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">

            {/* 👋 Seller Greeting */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Welcome back, <span className="text-blue-500 dark:text-blue-400">Seller</span> 👋
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Here's your store performance summary.
              </p>
            </div>

            {/* 📊 Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">Total Sales</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${stats.totalSales}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">Orders</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.orders}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">Products Listed</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.productsListed}</p>
              </div>
            </div>

            {/* 🧾 Orders Table */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Orders</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto shadow">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Order ID</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Customer</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Date</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((o) => (
                        <tr key={o.id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="p-4 text-sm font-medium text-blue-500">{o.id}</td>
                          <td className="p-4 text-sm">{o.customer}</td>
                          <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{o.date}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                o.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : o.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-right font-medium">{o.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No orders yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 🛒 Product List */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Product Listings</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto shadow">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Product</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Stock</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Price</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200 text-right">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((p) => (
                        <tr key={p._id || p.name} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="p-4 text-sm font-medium">{p.name}</td>
                          <td className="p-4 text-sm">{p.stock || 0}</td>
                          <td className="p-4 text-sm">{p.price || "$0"}</td>
                          <td className="p-4 text-sm text-right font-medium">{p.sales || 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-500 dark:text-gray-400">
                          No products yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
