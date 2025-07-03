import React from "react";

interface ListingCardProps {
  imageUrl: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  id: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  location,
  pricePerNight,
  rating,
  id,
}) => {
  console.log("Rendering ListingCard with ID:", id, "Title:", title);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 cursor-pointer">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            ${pricePerNight}/night
          </span>
          <span className="text-yellow-500 font-semibold">★ {rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
