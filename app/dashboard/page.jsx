"use client";

import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "dayjs/locale/en";
import Link from "next/link";
import Swal from "sweetalert2";

import { useAuth } from "@/context/AuthContext";
import useAxiosSecure from "@/lib/useAxiosSecure";

dayjs.extend(relativeTime);

const ManageProfilePage = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
    },
  });

  useEffect(() => {
    if (user?.name || user?.photoURL) {
      reset({
        name: user.name || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user, reset]);

  const openModal = () => {
    reset({
      name: user?.name || "",
      photoURL: user?.photoURL || "",
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosSecure.put(`/users/${user?._id}`, data);
      if (res.data?.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          background: "#0f1328",
          color: "#fff",
        });

        setUser((prev) => ({
          ...prev,
          name: data.name,
          photoURL: data.photoURL,
        }));

        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
        background: "#0f1328",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const { name, email, photoURL, createdAt, last_loggedIn } = user || {};
  const completeness = ([name, email, photoURL].filter(Boolean).length / 3) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" mx-auto p-6 md:p-10 rounded-2xl bg-gradient-to-br from-[#0f1328] to-[#1a1f3b] shadow-2xl text-white space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400">
          👋 Welcome, {name || "Valued Customer"}
        </h1>
        <p className="text-gray-300 mt-2">
          Manage your personal information and view your shopping details.
        </p>
      </div>

      {/* Vertical Profile Card */}
      <div className="bg-[#1c233d] rounded-xl p-6 md:p-8 shadow-xl border border-cyan-500 flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={photoURL || "https://avatar.iran.liara.run/public"}
            alt="User"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-cyan-400 shadow-lg hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow:
                "0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.4), 0 0 60px rgba(34, 211, 238, 0.2)",
            }}
          />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-50"></div>
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
          <p className="text-lg text-cyan-300 font-semibold">📧 {email}</p>
          <p className="text-gray-400">
            🕓 Joined:{" "}
            <span className="text-green-400">
              {dayjs(createdAt).format("MMM D, YYYY")} ({dayjs(createdAt).fromNow()})
            </span>
          </p>
          <p className="text-gray-400">
            🕘 Last Login:{" "}
            <span className="text-yellow-300">
              {dayjs(last_loggedIn).format("MMM D, YYYY h:mm A")} ({dayjs(last_loggedIn).fromNow()})
            </span>
          </p>
          <p className="text-gray-400">
            👥 Profile Completeness:{" "}
            <span
              className={`font-bold ${
                completeness >= 100
                  ? "text-green-400"
                  : completeness >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {Math.round(completeness)}%
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={openModal}
          className="btn btn-outline border-cyan-500 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-all"
        >
          ✏️ Edit Profile
        </button>
        <Link
          href="/dashboard/orders"
          className="btn btn-outline border-emerald-500 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all"
        >
          🛒 View Orders
        </Link>
        <Link
          href="/dashboard/address"
          className="btn btn-outline border-indigo-500 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
        >
          📍 Manage Address
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-[#1c233d] text-white border border-cyan-600 shadow-2xl rounded-xl p-6 md:p-8">
            <h3 className="font-bold text-2xl text-cyan-400 mb-6">Update Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="form-control">
                <label className="label text-gray-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`input input-bordered w-full bg-[#0f1328] text-white border-gray-600 focus:border-cyan-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "At least 2 characters" },
                    maxLength: { value: 50, message: "Max 50 characters" },
                  })}
                />
                {errors.name && (
                  <span className="text-red-400 text-sm mt-1">{errors.name.message}</span>
                )}
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label text-gray-300">Photo URL</label>
                <input
                  type="url"
                  placeholder="Enter photo URL"
                  className={`input input-bordered w-full bg-[#0f1328] text-white border-gray-600 focus:border-cyan-500 ${
                    errors.photoURL ? "border-red-500" : ""
                  }`}
                  {...register("photoURL", {
                    pattern: {
                      value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                      message: "Invalid image URL",
                    },
                  })}
                />
                {errors.photoURL && (
                  <span className="text-red-400 text-sm mt-1">{errors.photoURL.message}</span>
                )}
              </div>

              {/* Preview */}
              {watch("photoURL") && (
                <div className="flex justify-center">
                  <img
                    src={watch("photoURL")}
                    alt="Preview"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-cyan-500 shadow-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="modal-action flex justify-end gap-3 mt-4">
                <button
                  type="submit"
                  className="btn bg-cyan-600 text-white hover:bg-cyan-700 transition-all"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost text-gray-300 hover:bg-gray-700 transition-all"
                  onClick={closeModal}
                  disabled={isSubmitting || loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </motion.div>
  );
};

export default ManageProfilePage;
