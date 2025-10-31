"use client";

import React, { useState } from "react";
import { TrashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-500 text-lg">
        {i < rating ? "★" : "☆"}
      </span>
    ))}
  </div>
);

export default function ReviewList({ initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [editing, setEditing] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  // 🗑️ Delete Review
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ✏️ Open Edit Modal
  const handleEditClick = (review) => {
    setEditing(review);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  // 💾 Save Edited Review
  const handleSaveEdit = () => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === editing.id
          ? { ...r, comment: editedComment, rating: editedRating }
          : r
      )
    );
    setEditing(null);
  };

  return (
    <>
      {reviews.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-xl py-12">
          <p className="text-gray-500 text-lg">You haven't posted any reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow-lg rounded-xl p-5 relative hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                    {r.user[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{r.product}</h3>
                    <p className="text-gray-400 text-sm">{r.date}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-gray-100 transition"
                    title="Edit Review"
                    onClick={() => handleEditClick(r)}
                  >
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-100 transition"
                    title="Delete Review"
                    onClick={() => handleDelete(r.id)}
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Rating & Comment */}
              <div className="flex flex-col gap-2">
                <StarRating rating={r.rating} />
                <p className="text-gray-700">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditing(null)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Review</h2>

            {/* Rating */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Rating:
            </label>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setEditedRating(i + 1)}
                  className={`text-2xl ${
                    i < editedRating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Comment */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Comment:
            </label>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
              rows="3"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
