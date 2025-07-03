import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const Hero: React.FC = () => {
  return (
    <section className="-mt-20 -mb-20 relative bg-[url('/hero.jpg')] bg-cover bg-center h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Book flights, hotels, and unique experiences anywhere in the world
        </p>
        <Link to="/explore">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Explore Destinations
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
