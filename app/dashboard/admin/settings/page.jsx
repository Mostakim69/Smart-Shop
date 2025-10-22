"use client";

import React, { useState, useEffect } from "react";

// 🔹 Toggle Switch Component
function ToggleSwitch({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-700 font-medium">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </div>
    </label>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "",
    timezone: "",
    theme: "light",
    passwordPolicy: true,
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: false,
    currency: "BDT",
    paymentGateway: "Stripe",
  });

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    }
  };

  const tabs = ["general", "security", "notifications", "payments"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium transition-colors duration-300 ${
              activeTab === tab
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* General */}
        {activeTab === "general" && (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Theme</label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Security Settings
            </h2>
            <div className="flex flex-col gap-4">
              <ToggleSwitch
                label="Password Policy Enabled"
                name="passwordPolicy"
                checked={settings.passwordPolicy}
                onChange={handleChange}
              />
              <ToggleSwitch
                label="Two-Factor Authentication (2FA)"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Notification Settings
            </h2>
            <div className="flex flex-col gap-4">
              <ToggleSwitch
                label="Email Notifications"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <ToggleSwitch
                label="SMS Notifications"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === "payments" && (
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Payment Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Payment Gateway
                </label>
                <input
                  type="text"
                  name="paymentGateway"
                  value={settings.paymentGateway}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        Save Changes
      </button>
    </div>
  );
}
