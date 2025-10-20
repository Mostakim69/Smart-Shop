"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Product from "../components/product/Product";

export default function MyProductsPage() {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://smart-shop-server-three.vercel.app/products?sellerEmail=${user.email}`)
        .then((res) => {
          setMyProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-primary mb-4">My Products</h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => <Product
              key={product._id}
              product={product}
              myProducts={myProducts}
              setMyProducts={setMyProducts}
            ></Product>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
