"use client";

import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

import { useAuth } from "@/context/AuthContext";
import useAxiosSecure from "@/lib/useAxiosSecure";
import PageIntro from "@/utils/PageIntro";

dayjs.extend(relativeTime);

const Profile = () => {
    const { user, setUser, setRole, role } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [role, setRole] = useState(null);


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
            });
        } finally {
            setLoading(false);
        }
    };

    const { name, email, photoURL, createdAt, last_loggedIn,} = user || {};
    const completeness = ([name, email, photoURL].filter(Boolean).length / 3) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto p-6 md:p-10 space-y-8 text-gray-900"
        >
            {/* Header */}
            <PageIntro
                h1={`👋 Welcome  me, ${name || "Explorer"}`}
                p="You can update your profile details and manage your account."
            />

            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-300 shadow-md p-6 md:p-8 flex flex-col items-center space-y-4 backdrop-blur-sm">
                {/* Avatar */}
                <div className="relative">
                    <img
                        src={photoURL || "https://avatar.iran.liara.run/public"}
                        alt="User"
                        className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-cyan-400 shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Info */}
                <div className="text-center space-y-2">
                    <p className="text-lg text-gray-700 font-semibold">📧 {email}</p>
                    <p className="text-md text-gray-600">
                        🔐 Role: <span className="font-semibold text-cyan-600">{role}</span>
                    </p>
                    <p className="text-gray-500">
                        🕓 Joined:{" "}
                        <span className="text-green-600">
                            {dayjs(createdAt).format("MMM D, YYYY")} ({dayjs(createdAt).fromNow()})
                        </span>
                    </p>
                    <p className="text-gray-500">
                        🕘 Last Login:{" "}
                        <span className="text-yellow-600">
                            {dayjs(last_loggedIn).format("MMM D, YYYY h:mm A")} ({dayjs(last_loggedIn).fromNow()})
                        </span>
                    </p>
                    <p className="text-gray-500">
                        👥 Profile Completeness:{" "}
                        <span
                            className={`font-bold ${completeness >= 100
                                    ? "text-green-600"
                                    : completeness >= 60
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }`}
                        >
                            {Math.round(completeness)}%
                        </span>
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row md:justify-center gap-4 mt-6 max-w-[300px] mx-auto md:max-w-full">
                <button
                    className="btn border border-cyan-500 text-cyan-600 hover:bg-cyan-600 hover:text-white rounded-full"
                    onClick={openModal}
                    disabled={loading || isSubmitting}
                >
                    {loading || isSubmitting ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span> Updating...
                        </>
                    ) : (
                        "✏️ Update Profile"
                    )}
                </button>

                {role === "user" && (
                    <Link
                        href="/dashboard/user/joinasseller"
                        className="btn border border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full"
                    >
                        ✨ Join as Seller
                    </Link>
                )}
                {role === "user" && (
                    <Link
                        href="/dashboard/user/joinasseller"
                        className="btn border border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full"
                    >
                        ✨ Join as Delivariman
                    </Link>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box border border-cyan-600 rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-md bg-white text-gray-900">
                        <h3 className="font-bold text-2xl text-cyan-600 mb-6">Update Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label text-gray-700">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className={`input input-bordered w-full bg-gray-50 text-gray-900 border-gray-300 focus:border-cyan-500 ${errors.name ? "border-red-500" : ""
                                        }`}
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 2, message: "At least 2 characters" },
                                        maxLength: { value: 50, message: "Max 50 characters" },
                                    })}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                                )}
                            </div>

                            {/* Photo URL */}
                            <div className="form-control">
                                <label className="label text-gray-700">Photo URL</label>
                                <input
                                    type="url"
                                    placeholder="Enter photo URL"
                                    className={`input input-bordered w-full bg-gray-50 text-gray-900 border-gray-300 focus:border-cyan-500 ${errors.photoURL ? "border-red-500" : ""
                                        }`}
                                    {...register("photoURL", {
                                        pattern: {
                                            value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                                            message: "Invalid image URL",
                                        },
                                    })}
                                />
                                {errors.photoURL && (
                                    <span className="text-red-500 text-sm mt-1">{errors.photoURL.message}</span>
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
                                    className="btn btn-ghost text-gray-600 hover:bg-gray-100 transition-all"
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

export default Profile;
