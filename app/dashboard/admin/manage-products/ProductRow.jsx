"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ProductRow({ product }) {
  const router = useRouter();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://smart-shop-server-three.vercel.app/products/${product._id}`);
          if (res.data?.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            router.refresh(); // Refresh server component
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete product",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded" />
      </td>
      <td className="px-6 py-4">{product.name}</td>
      <td className="px-6 py-4 capitalize">{product.category}</td>
      <td className="px-6 py-4">${product.price}</td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4 flex justify-center gap-3">
        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800 cursor-pointer">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
