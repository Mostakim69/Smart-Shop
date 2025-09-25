"use client";
import { useState } from "react";

export default function ImageUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleChange = (e) => setImageFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!imageFile) return alert("Select an image first");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) setImageURL(data.data.url);
      else alert("Upload failed");
    } catch (err) {
      console.log(err);
      alert("Upload error");
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button
        type="button"
        onClick={handleUpload}
        className="w-full py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
      >
        Upload Image
      </button>
      {imageURL && (
        <input
          type="url"
          name="photo"
          value={imageURL}
          readOnly
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      )}
    </div>
  );
}
