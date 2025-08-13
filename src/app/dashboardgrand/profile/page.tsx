// pages/profile.tsx
"use client";
import React, { useState } from "react";
import { Camera, Mail, User, Lock } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    notifications: {
      reminders: true,
      dailySummary: false,
      leadAssignment: true,
    },
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationToggle = (key: string) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [key]: !profile.notifications[key as keyof typeof profile.notifications],
      },
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSave = () => {
    // Add save logic here (API call)
    console.log("Profile saved:", profile, password);
    alert("Profile changes saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-[#12284C] mb-6">My Profile</h1>

        {/* Profile Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#12284C] mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="flex flex-col items-center sm:items-start">
              <div className="relative w-32 h-32 mb-2">
                <img
                  src="/avatar-placeholder.png"
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full object-cover border-2 border-[#12284C]"
                />
                <button className="absolute bottom-0 right-0 bg-[#12284C] p-2 rounded-full text-white hover:bg-[#0f1f3a] transition">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-600 text-sm">Click camera to change</span>
            </div>
            <div className="sm:col-span-2 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#12284C]" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#12284C] outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#12284C]" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#12284C] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#12284C] mb-4">Change Password</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#12284C]" /> Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#12284C] outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#12284C]" /> New Password
                </label>
                <input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#12284C] outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#12284C]" /> Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#12284C] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#12284C] mb-4">Email Notifications</h2>
          <div className="space-y-4">
            {Object.entries(profile.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="capitalize text-gray-800">{key.replace(/([A-Z])/g, " $1")}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationToggle(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#12284C] rounded-full peer peer-checked:bg-[#12284C] transition"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-[#12284C] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#0f1f3a] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
