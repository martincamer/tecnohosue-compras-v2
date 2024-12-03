import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaBell,
  FaSearch,
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBuilding,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-700 h-16 sticky top-0 z-50 shadow-lg"
    >
      <div className="h-full px-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSidebar}
          className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors"
        >
          <FaBars className="text-white text-xl" />
        </motion.button>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <motion.input
              initial={{ width: "90%" }}
              whileFocus={{ width: "100%" }}
              transition={{ duration: 0.2 }}
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-500/20 text-white placeholder-blue-200"
            />
            <FaSearch className="absolute left-3 top-3 text-blue-200" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="/help"
              className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors hidden md:block"
            >
              <FaQuestionCircle className="text-white text-xl" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors"
            >
              <FaEnvelope className="text-white text-xl" />
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell className="text-white text-xl" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  3
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100"
                  >
                    <div className="px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">
                        Notificaciones
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3].map((notification) => (
                        <motion.div
                          key={notification}
                          whileHover={{ backgroundColor: "#F9FAFB" }}
                          className="px-4 py-3 cursor-pointer border-b border-gray-100"
                        >
                          <p className="text-sm text-gray-600">
                            Nueva notificación {notification}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Hace 5 minutos
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative ml-2">
            <motion.div
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.5)" }}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <FaUserCircle className="text-white text-2xl" />
              </motion.div>
              <span className="text-white hidden md:block">
                {auth?.nombre || "Usuario"}
              </span>
            </motion.div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100"
                >
                  <div className="px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
                    <p className="font-semibold text-gray-800">
                      {auth?.nombre}
                    </p>
                    <p className="text-sm text-gray-500">{auth?.email}</p>
                  </div>

                  {[
                    { icon: FaUser, text: "Mi Perfil", href: "/profile" },
                    { icon: FaBuilding, text: "Mi Empresa", href: "/company" },
                    { icon: FaCog, text: "Configuración", href: "/settings" },
                  ].map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      whileHover={{ backgroundColor: "#F9FAFB" }}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 border-b border-gray-100"
                    >
                      <item.icon className="text-gray-400" />
                      <span>{item.text}</span>
                    </motion.a>
                  ))}

                  <motion.button
                    whileHover={{ backgroundColor: "#FEE2E2" }}
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 w-full rounded-b-lg"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Cerrar Sesión</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
