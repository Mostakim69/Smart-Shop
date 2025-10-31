import ProductTable from "./ProductTable";

export default async function ProductsPage() {
  const res = await fetch("https://smart-shop-server-three.vercel.app/products", {
    cache: "no-store", // always get latest data
  });

  const products = await res.json();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">All Products</h2>

      {/* Pass data to the Client Component */}
      <ProductTable products={products} />
    </div>
  );
}
