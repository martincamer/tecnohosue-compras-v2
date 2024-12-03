import { motion } from "framer-motion";

const GoogleButton = ({ onClick, text }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3.5 px-6
                bg-white
                border border-gray-200
                rounded-xl
                flex items-center justify-center gap-3
                hover:border-gray-300
                transition-all duration-300
                text-gray-700 font-medium
                shadow-sm hover:shadow-md
                group"
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
      </motion.div>

      <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
        {text}
      </span>

      <motion.div
        className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default GoogleButton;
