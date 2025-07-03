import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import StepCard from "@/components/StepCard";
import TestimonialCard from "@/components/TestimonialCard";
import { FaSearch, FaCheckCircle, FaPlane } from "react-icons/fa";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Destination {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  pricePerNight: string;
  rating: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const Home: React.FC = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState<
    Destination[]
  >([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const snapshot = await getDocs(collection(db, "featured"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];
        setFeaturedDestinations(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured destinations:", error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const snapshot = await getDocs(collection(db, "testimonials"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonial[];
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTestimonials(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchFeatured();
    fetchTestimonials();
  }, []);

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white">
      <Hero />
      <section className="relative z-30 px-4 -mt-12 overflow-visible">
        <SearchBar />
      </section>

      {/* Popular Destinations */}
      <section className="mt-20 py-16 px-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StepCard
            icon={FaSearch}
            title="Search"
            description="Find the perfect destination, hotel, or rental."
          />
          <StepCard
            icon={FaCheckCircle}
            title="Compare"
            description="Compare prices, amenities, and ratings with ease."
          />
          <StepCard
            icon={FaPlane}
            title="Book"
            description="Book instantly and get ready to explore."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
