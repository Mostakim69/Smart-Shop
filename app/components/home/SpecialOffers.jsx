import React from "react";

export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "GIFT COUPON",
      code: "SPECIALGIFT",
      discount: "70$",
      bg: "bg-yellow-400",
      label: "SPECIAL DISCOUNT",
      description:
        "Get an instant $70 off on your next purchase over $250. Shop your favorite items and save more today!",
    },
    {
      id: 2,
      title: "SPECIAL OFFER",
      code: "HALFOFF",
      discount: "50%",
      bg: "bg-gray-900 text-white",
      label: "DISCOUNT COUPON",
      description:
        "Enjoy 50% off on all fashion and lifestyle products. Limited-time deal — don’t miss out!",
    },
    {
      id: 3,
      title: "MEGA DEAL",
      code: "SAVE30",
      discount: "30%",
      bg: "bg-blue-500 text-white",
      label: "LIMITED OFFER",
      description:
        "Get 30% off electronics and accessories. Upgrade your tech and save with this exclusive offer.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary bg-clip-text ">
            Special Offers & Coupons
          </h2>
          <p className="text-gray-500 mt-2">
            Unlock exclusive discounts and make your shopping experience smarter and more rewarding.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative flex items-center justify-between rounded-lg shadow-lg overflow-hidden ${offer.bg}`}
            >
              {/* Left Strip */}
              <div className="w-1/4 h-full flex flex-col justify-center items-center border-r border-dashed border-white py-6">
                <span className="text-xs font-semibold uppercase tracking-wide rotate-180 [writing-mode:vertical-rl]">
                  {offer.label}
                </span>
              </div>

              {/* Right Content */}
              <div className="flex-1 bg-gray-50 text-gray-800 py-6 px-6">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-4xl font-bold mb-2">{offer.discount}</p>
                <p className="text-sm mb-2 font-medium">Promo Code:</p>
                <div className="border border-gray-400 px-4 py-2 rounded-md font-mono text-center w-fit mb-4">
                  {offer.code}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
