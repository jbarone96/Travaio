import React from "react";
import { IconType } from "react-icons";

interface StepCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white bg-indigo-600 rounded-full">
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default StepCard;
