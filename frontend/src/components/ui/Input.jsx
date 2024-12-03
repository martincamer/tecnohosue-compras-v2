import { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(
  ({ label, error, icon: Icon, className = "", ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-control w-full"
      >
        {label && (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="label"
          >
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </motion.label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={20} />
            </div>
          )}

          <motion.input
            ref={ref}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`
            w-full px-4 py-3 
            ${Icon ? "pl-12" : "pl-4"}
            bg-white
            border border-gray-200 
            rounded-xl
            text-gray-700 
            text-sm
            placeholder:text-gray-400
            outline-none 
            transition-all
            duration-200
            hover:border-gray-300
            focus:border-blue-500/50
            focus:ring-4 
            focus:ring-blue-500/10
            ${error ? "border-red-500 hover:border-red-500" : ""}
            ${className}
          `}
            {...props}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-red-500"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
);

Input.displayName = "Input";

export default Input;
