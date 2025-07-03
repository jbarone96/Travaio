import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "@/hooks/AuthProvider";

const Bookings: React.FC = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;
      const q = query(
        collection(db, "bookings"),
        where("email", "==", currentUser.email)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      setLoading(false);
    };

    fetchBookings();
  }, [currentUser]);

  if (loading) return <p className="text-center">Loading bookings...</p>;
  if (bookings.length === 0)
    return <p className="text-center">No bookings found.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
        >
          <h3 className="text-lg font-bold mb-1">{booking.listingTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Guests: {booking.guests}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            From: {booking.checkIn} to {booking.checkOut}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Booked on:{" "}
            {booking.timestamp?.toDate?.().toLocaleDateString() || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
