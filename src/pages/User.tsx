import React, { useState } from "react";
import { useAuth } from "@/hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import Bookings from "@/pages/Bookings";
import { toast } from "react-hot-toast";

const User: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const handleEmailPreferencesClick = () => {
    alert("Email Preferences feature coming soon!");
  };

  const handlePasswordUpdate = () => {
    setShowPasswordModal(true);
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const submitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentUser.email) return;
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      toast.success("Password updated successfully.");
      closeModal();
    } catch (error: any) {
      toast.error(error.message || "Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    const confirmDelete = confirm(
      "Are you sure you want to delete your account and all associated data? This action is irreversible."
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(currentUser);
      toast.success("Account deleted successfully.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account.");
    }
  };

  if (!currentUser) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-8 relative">
      <div className="max-w-6xl mx-auto mb-4 text-right">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto mb-8 bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        <Bookings />
      </div>

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Account Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition cursor-pointer text-center"
            onClick={handlePasswordUpdate}
          >
            <p className="font-semibold text-lg">Update Password</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Change your login credentials
            </p>
          </div>
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition cursor-pointer text-center"
            onClick={handleEmailPreferencesClick}
          >
            <p className="font-semibold text-lg">Email Preferences</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage newsletter and alerts
            </p>
          </div>
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition cursor-pointer text-center"
            onClick={handleDeleteAccount}
          >
            <p className="font-semibold text-lg text-red-600">Delete Account</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Permanently remove your data
            </p>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>
            <form onSubmit={submitPasswordChange} className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default User;
