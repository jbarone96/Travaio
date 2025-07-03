import React, { useEffect, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import {
  collection,
  getDocs,
  query,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase";

const getRandomInts = (max: number, count: number): number[] => {
  const set = new Set<number>();
  while (set.size < count) {
    set.add(Math.floor(Math.random() * max));
  }
  return Array.from(set);
};

const About: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchRandomTestimonials = async () => {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const allData = snapshot.docs.map((doc) => doc.data());
      const picks = getRandomInts(allData.length, 2);
      setTestimonials(picks.map((i) => allData[i]));
    };

    fetchRandomTestimonials();
  }, []);

  return (
    <main className="font-sans text-gray-900 bg-white dark:bg-gray-950 dark:text-white">
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Travaio</h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          Travaio was created as a sleek, modern travel booking platform that
          empowers users to easily search, compare, and book their next
          adventure. Whether you're planning a quick getaway or a long vacation,
          Travaio is designed to deliver a seamless, intuitive experience.
        </p>

        <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          This project was built with React, TypeScript, TailwindCSS, and a
          vision to showcase a professional-grade front-end application. In the
          future, Travaio may include real-time data, authentication, and cloud
          integration using Firebase.
        </p>
      </section>

      <section className="pb-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What People Are Saying
        </h2>
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

export default About;
