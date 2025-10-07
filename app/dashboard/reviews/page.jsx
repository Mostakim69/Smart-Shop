"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star, Search, Trash2, MessageSquare, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [activeReply, setActiveReply] = useState(null);

  // Mock data
  useEffect(() => {
    setLoading(true);
    const mock = Array.from({ length: 24 }).map((_, i) => ({
      id: i + 1,
      product: `Product ${((i % 6) + 1)}`,
      user: `User ${i + 1}`,
      rating: (i % 5) + 1,
      title: ["Excellent", "Good", "Okay", "Not great", "Bad"][i % 5],
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
      helpful: Math.floor(Math.random() * 50),
      replied: i % 7 === 0 ? { by: "Support", message: "Thanks! We'll improve." } : null,
      featured: i % 11 === 0,
    }));

    setTimeout(() => {
      setReviews(mock);
      setLoading(false);
    }, 400);
  }, []);

  const filtered = useMemo(() => {
    let r = reviews;
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (x) =>
          x.user.toLowerCase().includes(q) ||
          x.product.toLowerCase().includes(q) ||
          x.title.toLowerCase().includes(q) ||
          x.body.toLowerCase().includes(q)
      );
    }
    if (minRating > 0) r = r.filter((x) => x.rating >= minRating);

    if (sortBy === "newest") r = r.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "oldest") r = r.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "highest") r = r.slice().sort((a, b) => b.rating - a.rating);
    if (sortBy === "lowest") r = r.slice().sort((a, b) => a.rating - b.rating);

    return r;
  }, [reviews, query, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const toggleSelect = (id) => {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  };

  const selectAllOnPage = () => {
    const s = new Set(selected);
    pageItems.forEach((r) => s.add(r.id));
    setSelected(s);
  };

  const clearSelection = () => setSelected(new Set());

  const bulkDelete = () => {
    const ids = Array.from(selected);
    setReviews((prev) => prev.filter((r) => !ids.includes(r.id)));
    clearSelection();
  };

  const toggleFeatured = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)));
  };

  const submitReply = (id, message) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, replied: { by: "You", message } } : r)));
    setActiveReply(null);
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Reviews</h1>
            <p className="text-sm text-gray-500 mt-1">Manage, respond and curate product reviews.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-2 shadow-sm w-full sm:w-auto">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by user, product or text"
                className="outline-none text-sm placeholder-gray-400 w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="border rounded-md px-3 py-2 bg-white text-sm"
              >
                <option value={0}>All ratings</option>
                <option value={4}>4 stars & up</option>
                <option value={3}>3 stars & up</option>
                <option value={2}>2 stars & up</option>
                <option value={1}>1 star & up</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
            </div>
          </div>
        </header>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={selectAllOnPage}
              className="text-sm px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              Select page
            </button>
            <button
              onClick={clearSelection}
              className="text-sm px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              Clear
            </button>
            <button
              onClick={bulkDelete}
              disabled={selected.size === 0}
              className={`text-sm px-3 py-2 border rounded-md shadow-sm flex items-center gap-2 transition ${
                selected.size === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              <Trash2 className="w-4 h-4" /> Delete ({selected.size})
            </button>
          </div>

          <div className="text-sm text-gray-600 mt-2 sm:mt-0">Showing {filtered.length} reviews</div>
        </div>

        <main>
          {loading ? (
            <div className="grid place-items-center h-64 text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((r) => (
                <article
                  key={r.id}
                  className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition relative"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{r.user}</h3>
                            <span className="text-xs text-gray-400">· {new Date(r.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm text-gray-500">{r.product}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold">{r.rating}</span>
                          </div>
                          {r.featured && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                          )}
                        </div>
                      </div>

                      <h4 className="mt-3 font-medium text-gray-700">{r.title}</h4>
                      <p className="text-sm text-gray-600 mt-2">{r.body}</p>

                      <div className="mt-3 flex items-center gap-3 text-sm">
                        <button
                          onClick={() => setActiveReply(r)}
                          className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-50 transition"
                        >
                          <MessageSquare className="w-4 h-4" /> Reply
                        </button>

                        <button
                          onClick={() => toggleFeatured(r.id)}
                          className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-50 transition"
                        >
                          <CheckCircle className="w-4 h-4" /> {r.featured ? "Unfeature" : "Feature"}
                        </button>

                        <button
                          onClick={() => {
                            setReviews((prev) => prev.filter((x) => x.id !== r.id));
                            setSelected((s) => {
                              const n = new Set(s);
                              n.delete(r.id);
                              return n;
                            });
                          }}
                          className="flex items-center gap-2 px-3 py-1 border rounded-md text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selected.has(r.id)}
                            onChange={() => toggleSelect(r.id)}
                          />
                          Select
                        </label>
                        <div>Helpful: {r.helpful}</div>
                        <div>ID: {r.id}</div>
                      </div>

                      {r.replied && (
                        <div className="mt-3 bg-gray-50 border rounded-md p-3 text-sm text-gray-700">
                          <div className="font-medium">Reply by {r.replied.by}:</div>
                          <div className="mt-1">{r.replied.message}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>

              <div className="px-3 py-2 border rounded-md">
                Page {page} / {totalPages}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-100 transition"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500">Per page: {perPage}</div>
          </div>
        </main>
      </div>

      {activeReply && (
        <ReplyModal
          review={activeReply}
          onClose={() => setActiveReply(null)}
          onSubmit={(message) => submitReply(activeReply.id, message)}
        />
      )}
    </section>
  );
}

function ReplyModal({ review, onClose, onSubmit }) {
  const [message, setMessage] = useState("");

  useEffect(() => setMessage(review?.replied?.message || ""), [review]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg animate-fadeIn">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Reply to {review.user}</h3>
            <p className="text-sm text-gray-500">Product: {review.product} · Rating: {review.rating}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">Close</button>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full mt-4 border rounded-md p-3 text-sm focus:ring-1 focus:ring-blue-500"
          placeholder="Write a helpful, polite reply..."
        />

        <div className="mt-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">Cancel</button>
          <button
            onClick={() => onSubmit(message)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Send reply
          </button>
        </div>
      </div>
    </div>
  );
}
