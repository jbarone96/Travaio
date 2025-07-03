interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  quote,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={
            avatar && avatar.trim() !== ""
              ? avatar
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-gray-900 dark:text-white font-semibold">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic">“{quote}”</p>
    </div>
  );
};

export default TestimonialCard;
