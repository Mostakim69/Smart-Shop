export default function FAQSection() {
  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold mb-4 text-center">FAQ</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer font-medium">
            How long does it take to get a reply?
          </summary>
          <p className="mt-2 text-gray-600">Usually within 24-48 business hours.</p>
        </details>
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer font-medium">Do you offer support 24/7?</summary>
          <p className="mt-2 text-gray-600">
            No, our support team is available Monday to Friday, 9am - 6pm.
          </p>
        </details>
    <details className="border rounded-lg p-4">
      <summary className="cursor-pointer font-medium">
        Can I track my order?
      </summary>
      <p className="mt-2 text-gray-600">
        Yes, once your order is shipped, you’ll receive a tracking link via email.
      </p>
    </details>
    <details className="border rounded-lg p-4">
      <summary className="cursor-pointer font-medium">
        What payment methods are accepted?
      </summary>
      <p className="mt-2 text-gray-600">
        We accept all major credit cards, PayPal, and mobile payments.
      </p>
    </details>
    <details className="border rounded-lg p-4">
      <summary className="cursor-pointer font-medium">
        Can I return a product?
      </summary>
      <p className="mt-2 text-gray-600">
        Yes, returns are accepted within 14 days of purchase with original packaging.
      </p>
    </details>
      </div>
    </div>
  );
}
