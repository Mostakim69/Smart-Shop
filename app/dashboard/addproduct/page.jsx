"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AddProductForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const watchImage = watch("image");

  const onSubmit = (data) => {
    if (!user?.email) {
      Swal.fire("Error", "You must be logged in to add a product", "error");
      return;
    }

    data.sellerName = user.displayName;
    data.sellerEmail = user.email;

    setLoading(true);

    axios
      .post("https://smart-shop-server-three.vercel.app/products", data)
      .then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Something went wrong!", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-2xl border border-gray-100">
      {/* Gradient Title */}
      <h2 className="text-3xl font-bold text-center text-secondary bg-clip-text mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div className="form-group">
          <label className="block font-medium text-secondary mb-1">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="w-full input input-bordered focus:ring-2 focus:ring-indigo-300 rounded-xl transition-all"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label className="block font-medium text-secondary mb-1">Price ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            className="w-full input input-bordered focus:ring-2 focus:ring-indigo-300 rounded-xl transition-all"
            placeholder="Enter product price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block font-medium text-secondary mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full textarea textarea-bordered focus:ring-2 focus:ring-indigo-300 rounded-xl transition-all resize-none"
            placeholder="Enter product description"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label className="block font-medium text-secondary mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", {
              pattern: {
                value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                message: "Enter a valid image URL",
              },
            })}
            className="w-full input input-bordered focus:ring-2 focus:ring-indigo-300 rounded-xl transition-all"
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          {watchImage && (
            <div className="mt-3 flex justify-center">
              <img
                src={watchImage}
                alt="Preview"
                className="h-28 w-28 object-cover rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="block font-medium text-secondary mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full select select-bordered focus:ring-2 focus:ring-indigo-300 rounded-xl transition-all"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="home">Home & Living</option>
            <option value="toys">Gifts & Toys</option>
            <option value="sports">Fitness & Sports</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-secondary py-3 text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
