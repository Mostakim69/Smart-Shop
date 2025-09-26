"use client";

import { useState } from "react";

export default function ImageUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setLoading(true);
    setError("");
    setImageURL("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
  `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
  { method: "POST", body: formData }
);


      const data = await res.json();

      if (data.success) {
        setImageURL(data.data.url);
      } else {
        setError("Upload failed. Try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Upload error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} className="text-gray-700 cursor-pointer" />

      {loading && <p className="text-gray-500 text-sm">Uploading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {imageURL && (
        <div className="space-y-2">
          <input
            type="url"
            name="photo"
            value={imageURL}
            readOnly
            className="w-full text-black px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
          />
          
        </div>
      )}
    </div>
  );
}
