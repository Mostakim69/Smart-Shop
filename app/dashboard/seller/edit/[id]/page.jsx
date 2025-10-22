"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Loader2, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


export default function EditProductPage() {
  // console.log('hello');
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {
    register, handleSubmit, reset, formState: { errors }, watch,
  } = useForm();

  const watchImage = watch("image");

  // Fetch product details
  useEffect(() => {
    axios
      .get(`https://smart-shop-server-three.vercel.app/products/${id}`)
      .then((res) => {
        reset(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load product details", "error");
        setLoading(false);
      });
  }, [id, reset]);


  // ✅ Handle form submit
  const onSubmit = async (data) => {

    data.sellerName = user.displayName;
    data.sellerEmail = user.email;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.put(`https://smart-shop-server-three.vercel.app/products/${id}`, data);

        if (res.data?.modifiedCount > 0 || res.data?.acknowledged) {
          await Swal.fire({
            title: "Updated!",
            text: "Product has been updated successfully.",
            icon: "success"
          });
        } else {
          await Swal.fire({
            title: "No Changes!",
            text: "No fields were modified.",
            icon: "info"
          });
        }

      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error"
        });
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
        <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
      </div>
    );

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h2 className="text-2xl font-bold text-indigo-700 tracking-tight">
            ✏️ Edit Product
          </h2>
        </div>

        <p className="text-gray-500 text-center mb-6">
          Update your product details below with care.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="w-full input input-bordered border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              className="w-full input input-bordered border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
              placeholder="Enter product price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full textarea textarea-bordered border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none h-28"
              placeholder="Write a short product description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL + Preview */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("image", {
                  pattern: {
                    value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                    message: "Enter a valid image URL",
                  },
                })}
                className="w-full input input-bordered border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl pr-10"
                placeholder="Paste image link (https://...)"
              />
              <ImageIcon
                size={18}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
            {watchImage && (
              <div className="flex justify-center mt-3">
                <img src={watchImage} alt="Preview" className="h-24 w-24 object-cover rounded-lg border shadow-md transition-transform duration-200 hover:scale-105" />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select {...register("category", { required: "Category is required" })} className="select select-bordered border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl w-full"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
              <option value="home">Home & Living</option>
              <option value="toys">Gifts & Toys</option>
              <option value="sports">Fitness & Sports</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <button type="button" onClick={() => router.back()} className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button type="submit" className="w-1/2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
