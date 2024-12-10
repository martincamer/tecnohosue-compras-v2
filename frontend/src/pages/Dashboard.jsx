import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import {
  DollarSign,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Package,
  ShoppingBag,
} from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import { formatearDinero } from "../utils/formatearDinero";
import { motion } from "framer-motion";
import { User } from "lucide-react";

registerLocale("es", es);

const Dashboard = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Muestra un spinner o mensaje de carga
  }

  if (!auth.user) {
    return <div>No estás autenticado</div>; // Maneja el caso de no autenticación
  }

  console.log("user", auth);

  return (
    <DashboardContainer>
      <WelcomeSection>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Header con Avatar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-blue-100">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <User size={24} className="text-white" />
                  </motion.div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    Bienvenido, {auth.user.nombre}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    de{" "}
                    <span className="font-medium text-blue-600">FABRICA</span>
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4"></div>
          </motion.div>
        </div>
      </WelcomeSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {[
          {
            title: "Productos Cargados",
            value: "" || 0,
            icon: Package,
            color: "blue",
            gradient: "from-blue-50 to-blue-100s",
            iconBg: "bg-blue-500",
          },
          {
            title: "Gastos",
            value: formatearDinero(123123),
            icon: ArrowDown,
            color: "red",
            gradient: "from-red-50 to-red-100",
            iconBg: "bg-red-500",
          },
          {
            title: "Pagado a Proveedores (Efectivo)",
            value: formatearDinero(123213),
            icon: DollarSign,
            color: "green",
            gradient: "from-green-50 to-green-100",
            iconBg: "bg-green-500",
          },
          {
            title: "Pagado a Proveedores (Banco)",
            value: formatearDinero(31233),
            icon: CreditCard,
            color: "yellow",
            gradient: "from-yellow-50 to-yellow-100",
            iconBg: "bg-yellow-500",
          },
          {
            title: "Total de Productos",
            value: "" || 0,
            icon: ShoppingBag,
            color: "purple",
            gradient: "from-purple-50 to-purple-100",
            iconBg: "bg-purple-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-gradient-to-br ${stat.gradient} rounded-xl border border-${stat.color}-200 shadow-sm overflow-hidden`}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${stat.iconBg} p-3 rounded-xl shadow-lg shadow-${stat.color}-100`}
                >
                  <stat.icon size={24} className="text-white" />
                </motion.div>
                <div>
                  <p
                    className={`text-sm font-medium text-${stat.color}-600 mb-1`}
                  >
                    {stat.title}
                  </p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-xl font-bold text-gray-900"
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>

              {/* Gráfico mini opcional */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className={`text-xs font-medium text-${stat.color}-600`}>
                    vs. mes anterior
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1"
                  >
                    <ArrowUp size={14} className={`text-${stat.color}-500`} />
                    <span
                      className={`text-sm font-semibold text-${stat.color}-600`}
                    >
                      12%
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardContainer>
  );
};

// Estilos
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
  }
  p {
    color: #6b7280;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${(props) => (props.positive ? "#059669" : "#dc2626")};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const ChartCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  background-color: ${(props) => (props.active ? "#3b82f6" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#374151")};
  border: 1px solid ${(props) => (props.active ? "#3b82f6" : "#e5e7eb")};

  &:hover {
    background-color: ${(props) => (props.active ? "#2563eb" : "#f9fafb")};
  }
`;

const DatePickerContainer = styled.div`
  .react-datepicker-wrapper {
    width: auto;
  }

  .react-datepicker {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-family: inherit;
  }

  .react-datepicker__header {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  .react-datepicker__day--selected {
    background-color: #3b82f6;
  }
`;

const CustomDateInput = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: #fff;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  svg {
    color: #6b7280;
  }
`;

export default Dashboard;
