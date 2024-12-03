import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCajaBanco } from "../context/CajaBancoContext";
import { useClientes } from "../context/ClientesContext";
import { useCompras } from "../context/ComprasContext";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Package,
  ShoppingBag,
} from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { formatearDinero } from "../utils/formatearDinero";
import getConfig from "../helpers/configHeader";
import clienteAxios from "../config/axios";
import { motion } from "framer-motion";
import { User } from "lucide-react";

registerLocale("es", es);

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { auth } = useAuth();

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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* <div className="flex gap-2">
                {[
                  { type: "month", label: "Mes Actual" },
                  { type: "year", label: "Año Actual" },
                  { type: "custom", label: "Personalizado" },
                ].map(({ type, label }) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterChange(type)}
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                      ${
                        filterType === type
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-100"
                          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }
                    `}
                  >
                    {label}
                  </motion.button>
                ))}
              </div> */}

              {/* {filterType === "custom" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <DatePicker
                    selectsRange
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={(update) => {
                      setDateRange({
                        startDate: update[0],
                        endDate: update[1] || update[0],
                      });
                    }}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-all group"
                      >
                        <Calendar size={18} className="text-blue-500" />
                        <span className="font-medium"></span>
                        <ChevronDown
                          size={18}
                          className="text-gray-400 group-hover:text-blue-500 transition-colors"
                        />
                      </motion.button>
                    }
                  />
                </motion.div>
              )} */}
            </div>
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

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Ventas vs Compras
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm text-gray-600">Ventas</span>
              <span className="w-3 h-3 rounded-full bg-red-500 ml-2"></span>
              <span className="text-sm text-gray-600">Compras</span>
            </div>
          </div>
          <Line
            data={ventasChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  padding: 12,
                  bodyFont: {
                    size: 13,
                  },
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ${formatearDinero(
                        context.raw
                      )}`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(156, 163, 175, 0.1)",
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                    callback: function (value) {
                      return formatearDinero(value);
                    },
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Distribución de Ingresos
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm text-gray-600">Ventas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-sm text-gray-600">Otros</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[80%]">
              <Doughnut
                data={{
                  labels: ["Ventas", "Otros Ingresos"],
                  datasets: [
                    {
                      data: [
                        estadisticas.ventas.total,
                        estadisticas.ventas.total * 0.1,
                      ],
                      backgroundColor: ["#3b82f6", "#10b981"],
                      borderWidth: 0,
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  cutout: "70%",
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      padding: 12,
                      bodyFont: {
                        size: 13,
                      },
                      callbacks: {
                        label: function (context) {
                          const label = context.label || "";
                          const value = formatearDinero(context.raw);
                          const percentage = Math.round(
                            (context.raw / estadisticas.ventas.total) * 100
                          );
                          return `${label}: ${value} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div> */}
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
