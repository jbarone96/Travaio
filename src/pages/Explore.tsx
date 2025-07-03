import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../firebase";
import ListingCard from "@/components/ListingCard";

const Explore: React.FC = () => {
  const [exploreListings, setExploreListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreListings = async () => {
      try {
        const listingsRef = collection(db, "searchResults");
        const q = query(listingsRef, limit(9));
        const snapshot = await getDocs(q);
        const listings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExploreListings(listings);
      } catch (error) {
        console.error("Error fetching explore listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreListings();
  }, []);

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white min-h-screen">
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Explore Popular Destinations
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : exploreListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exploreListings.map((listing) => (
              <Link to={`/listing/${listing.id}`} key={listing.id}>
                <ListingCard {...listing} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            No popular destinations available.
          </p>
        )}
      </section>
    </main>
  );
};

export default Explore;
