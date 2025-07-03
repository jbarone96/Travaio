import React from "react";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  pricePerNight: string;
  rating: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  imageUrl,
  title,
  location,
  pricePerNight,
  rating,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${id}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            ${pricePerNight}/night
          </span>
          <span className="text-yellow-500 font-semibold">
            {"\u2605"} {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
