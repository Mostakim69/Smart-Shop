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
    <div className="max-w-lg mx-auto bg-base-100 shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Add Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium text-secondary">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="w-full input input-bordered"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-secondary">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            className="w-full input input-bordered"
            placeholder="Enter product price"
          />
          {errors.price && <p className="text-error text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-secondary">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full textarea textarea-bordered"
            placeholder="Enter product description"
          ></textarea>
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-secondary">Image URL</label>
          <input
            type="text"
            {...register("image", {
              pattern: {
                value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                message: "Enter a valid image URL",
              },
            })}
            className="w-full input input-bordered"
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-error text-sm">{errors.image.message}</p>}
          {watchImage && (
            <img src={watchImage} alt="Preview" className="h-24 w-24 object-cover mt-2 rounded" />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-secondary">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
            <option value="home">Home & Living</option>
            <option value="toys">Gifts & Toys</option>
            <option value="sports">Fitness & Sports</option>
          </select>
          {errors.category && <p className="text-error text-sm">{errors.category.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
