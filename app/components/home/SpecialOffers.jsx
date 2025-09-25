import React from "react";

export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "20% OFF on Electronics",
      code: "ELEC20",
      condition: "Valid on orders above $100",
    },
    {
      id: 2,
      title: "Free Shipping",
      code: "FREESHIP",
      condition: "All orders above $50",
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Free",
      code: "BOGO",
      condition: "Applicable on Fashion category",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-black">
            Special Offers & Coupons
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto text-gray-400">
            Grab the best deals and discounts available for a limited time!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-blue-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition relative"
            >
              {/* Ribbon / Badge */}
              <span className="absolute top-2 left-6 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Hot Deal
              </span>

              {/* Offer Info */}
              <h3 className="text-base sm:text-lg font-semibold mb-2 mt-4 text-black">
                {offer.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {offer.condition}
              </p>

              {/* Coupon & Button */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="font-bold text-secondary border border-secondary px-2 py-1 rounded cursor-pointer hover:transition text-center sm:text-left">
                  {offer.code}
                </span>
                <button className="px-3 py-1 sm:px-4 sm:py-2 bg-secondary text-white rounded hover:cursor-pointer transition w-full sm:w-auto">
                  Grab Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
