import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { Button } from "@/components/Button";
import TestimonialCard from "@/components/TestimonialCard";

const getRandomInts = (max: number, count: number): number[] => {
  const set = new Set<number>();
  while (set.size < count && set.size < max) {
    set.add(Math.floor(Math.random() * max));
  }
  return Array.from(set);
};

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        let docSnap = await getDoc(doc(db, "searchResults", id));

        if (!docSnap.exists()) {
          docSnap = await getDoc(doc(db, "featured", id));
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched listing:", { ...data, id: docSnap.id });
          setListing({ ...data, id: docSnap.id });
        } else {
          console.warn("No listing found in Firestore for ID:", id);
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTestimonials = async () => {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const all = snapshot.docs.map((doc) => doc.data());
      const picks = getRandomInts(all.length, 2);
      setTestimonials(picks.map((i) => all[i]));
    };

    fetchListing();
    fetchTestimonials();
  }, [id]);

  const handleBookNow = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("Current listing before book:", listing);
    if (!user) {
      alert("You must be signed in to book a listing.");
      return;
    }
    if (!listing?.id) {
      alert("Listing info is still loading. Please wait a moment.");
      return;
    }
    console.log("Navigating to booking:", `/booking/${listing.id}`);
    navigate(`/booking/${listing.id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading listing...</p>;
  if (!listing) return <p className="text-center mt-10">Listing not found.</p>;

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white">
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {listing.location}
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-xl font-semibold mb-4">
              ${listing.pricePerNight}/night
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {listing.description}
            </p>
            <Button className="mt-6" onClick={handleBookNow}>
              Book Now
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Traveler Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              name={t.name}
              role={t.role}
              avatar={
                t.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              quote={t.quote}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ListingDetails;
