"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";

interface ProfileData {
  id?: number;
  name: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({ name: "", email: "" });
  const [password, setPassword] = useState<{ new: string; confirm: string }>({
    new: "",
    confirm: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch("/api/signup"); 
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProfile({ 
          id: data.id,
          name: data.name || "", 
          email: data.email || "" 
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      alert("Name and email are required");
      return;
    }

    if (password.new && password.new !== password.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setUpdating(true);
      const updateData: { name: string; email: string; password?: string } = {
        name: profile.name,
        email: profile.email
      };
      if (password.new) {
        updateData.password = password.new;
      }

      const res = await fetch(`/api/signup/${profile.id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert("Profile updated successfully!");
      setShowForm(false);
      setPassword({ new: "", confirm: "" }); 
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleModifyClick = () => {
    setShowForm(true);
    setPassword({ new: "", confirm: "" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setPassword({ new: "", confirm: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>

        {!showForm && (
          <div className="space-y-4">
            {/* Display current profile info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-600">{profile.name || "Not set"}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-600">{profile.email || "Not set"}</span>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleModifyClick}
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Modify Profile
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 border px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-700 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 border px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-700 outline-none"
                required
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                placeholder="New Password (optional)"
                className="w-full pl-10 border px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-700 outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="w-full pl-10 border px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-700 outline-none"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSave}
                disabled={updating}
                className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={updating}
                className="border px-6 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;