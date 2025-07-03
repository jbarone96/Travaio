import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";

const BookingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [listing, setListing] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      let snap = await getDoc(doc(db, "searchResults", id));
      if (!snap.exists()) {
        snap = await getDoc(doc(db, "featured", id));
      }
      if (snap.exists()) {
        setListing(snap.data());
      }
    };
    fetchListing();
  }, [id]);

  const validate = () => {
    const errs: any = {};
    if (formData.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email.";
    if (!formData.checkIn) errs.checkIn = "Check-in date is required.";
    if (!formData.checkOut) errs.checkOut = "Check-out date is required.";
    if (
      formData.checkIn &&
      formData.checkOut &&
      new Date(formData.checkOut) <= new Date(formData.checkIn)
    ) {
      errs.checkOut = "Check-out must be after check-in.";
    }
    if (formData.guests < 1) errs.guests = "At least 1 guest required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        guests: Number(formData.guests),
        listingId: id,
        listingTitle: listing?.title || "",
        timestamp: serverTimestamp(),
      });
      toast.success("Booking confirmed!");
      navigate("/bookings");
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (!listing)
    return <p className="text-center mt-10">Loading listing info...</p>;

  const inputClasses = (field: string) =>
    `w-full p-3 border rounded dark:bg-gray-800 ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white min-h-screen px-6 py-16">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Book {listing.title}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className={inputClasses("name")}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className={inputClasses("email")}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              name="checkIn"
              type="date"
              required
              className={inputClasses("checkIn")}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.checkIn && (
              <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
            )}
          </div>
          <div>
            <input
              name="checkOut"
              type="date"
              required
              className={inputClasses("checkOut")}
              onChange={handleChange}
              min={formData.checkIn || new Date().toISOString().split("T")[0]}
            />
            {errors.checkOut && (
              <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
            )}
          </div>
          <div>
            <input
              name="guests"
              type="number"
              min={1}
              required
              className={inputClasses("guests")}
              placeholder="Guests"
              onChange={handleChange}
            />
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
};

export default BookingForm;
