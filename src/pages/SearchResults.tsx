import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const listingsRef = collection(db, "searchResults");
      const q = query(listingsRef, where("location", "==", destination));
      const snapshot = await getDocs(q);
      const listings = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          imageUrl: data.imageUrl,
          title: data.title,
          location: data.location,
          pricePerNight: data.pricePerNight,
          rating: data.rating,
        };
      });
      setResults(listings);
      setLoading(false);
    };

    if (destination) fetchResults();
    else {
      setResults([]);
      setLoading(false);
    }
  }, [destination]);

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white">
      <section className="py-6 px-4 max-w-6xl mx-auto">
        <SearchBar />
      </section>
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Search Results</h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((result) => (
              <Link to={`/listing/${result.id}`} key={result.id}>
                <ListingCard {...result} id={result.id} />
              </Link>
            ))}
          </div>
        ) : destination ? (
          <p className="text-center text-lg">
            No listings found for "{destination}"
          </p>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            No search results. Please begin your search above.
          </p>
        )}
      </section>
    </main>
  );
};

export default SearchResults;
