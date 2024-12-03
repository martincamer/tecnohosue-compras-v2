import { useState } from "react";
import {
  FileText,
  Shield,
  Paperclip,
  Plus,
  AppWindow,
  Box,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import ContratoVivienda from "./ContratoVivienda";
import GarantiasContrato from "./GarantiasContrato";
import Adquiriente from "./Adquiriente";
import CaracteristicasTecnicas from "./CaracteristicasTecnicas";
import NormasPlatea from "./NormasPlatea";
import BasePlatea from "./BasePlatea";
import Requisitos from "./Requisitos";
import AnexoDos from "./AnexoDos";
import AutorizacionFoto from "./AutorizacionFoto";
import Publicidad from "./Publicidad";
import GarantiasAnexo from "./GarantiasAnexo";
import { useAuth } from "../../../context/AuthContext";

const DocumentosLegales = ({ cliente, clienteId }) => {
  const [activeSubTab, setActiveSubTab] = useState("contratos");
  const { auth } = useAuth();

  console.log("authenticated", auth.user.direccion);
  console.log("authenticated", auth.user.localidad);

  const subTabs = [
    {
      id: "contratos",
      label: "Contratos",
      icon: FileText,
      color: "blue",
    },
    {
      id: "garantias",
      label: "Garantías",
      icon: Shield,
      color: "green",
    },
    {
      id: "adquiriente",
      label: "Adquirente",
      icon: Paperclip,
      color: "purple",
    },
    {
      id: "caracteristicas",
      label: "Características Técnicas",
      icon: FileCheck,
      color: "orange",
    },
    {
      id: "normas",
      label: "Normas Platea",
      icon: AppWindow,
      color: "pink",
    },
    {
      id: "base",
      label: "Base Platea",
      icon: Box,
      color: "indigo",
    },
    {
      id: "requisitos",
      label: "Requisitos",
      icon: Plus,
      color: "red",
    },
    {
      id: "anexo2",
      label: "Anexo II",
      icon: Plus,
      color: "yellow",
    },
    {
      id: "autorizacion",
      label: "Autorización Foto",
      icon: Plus,
      color: "teal",
    },
    {
      id: "publicidad",
      label: "Publicidad",
      icon: Plus,
      color: "lime",
    },
    {
      id: "garantias anexo",
      label: "Anexo V - Garantías",
      icon: Plus,
      color: "fuchsia",
    },
  ];

  const getTabColor = (color, isActive) => {
    const colors = {
      blue: isActive ? "bg-blue-50 text-blue-600 border-blue-600" : "",
      green: isActive ? "bg-green-50 text-green-600 border-green-600" : "",
      purple: isActive ? "bg-purple-50 text-purple-600 border-purple-600" : "",
      orange: isActive ? "bg-orange-50 text-orange-600 border-orange-600" : "",
      pink: isActive ? "bg-pink-50 text-pink-600 border-pink-600" : "",
      indigo: isActive ? "bg-indigo-50 text-indigo-600 border-indigo-600" : "",
      red: isActive ? "bg-red-50 text-red-600 border-red-600" : "",
      yellow: isActive ? "bg-yellow-50 text-yellow-600 border-yellow-600" : "",
      teal: isActive ? "bg-teal-50 text-teal-600 border-teal-600" : "",
      lime: isActive ? "bg-lime-50 text-lime-600 border-lime-600" : "",
      fuchsia: isActive
        ? "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-600"
        : "",
    };
    return colors[color] || "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Header con título y descripción */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <FileText size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Documentos Legales
            </h2>
            <p className="text-sm text-gray-500">
              Gestiona todos los documentos legales del cliente
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation con scroll horizontal */}
      <div className="relative">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-2 flex-wrap">
            {subTabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSubTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium
                  transition-all duration-200 border-2
                  ${
                    activeSubTab === tab.id
                      ? getTabColor(tab.color, true)
                      : "bg-white text-gray-600 border-transparent hover:bg-gray-50"
                  }
                `}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 ">
          {/* Contenido dinámico basado en el tab activo */}
          {activeSubTab === "contratos" && (
            <ContratoVivienda
              cliente={cliente}
              modeloContratado={cliente?.modeloContratado || null}
            />
          )}
          {activeSubTab === "garantias" && (
            <GarantiasContrato cliente={cliente} />
          )}
          {activeSubTab === "adquiriente" && <Adquiriente cliente={cliente} />}
          {activeSubTab === "caracteristicas" && (
            <CaracteristicasTecnicas cliente={cliente} />
          )}
          {activeSubTab === "normas" && <NormasPlatea cliente={cliente} />}
          {activeSubTab === "base" && <BasePlatea cliente={cliente} />}
          {activeSubTab === "requisitos" && <Requisitos cliente={cliente} />}
          {activeSubTab === "anexo2" && <AnexoDos cliente={cliente} />}
          {activeSubTab === "autorizacion" && (
            <AutorizacionFoto cliente={cliente} />
          )}
          {activeSubTab === "publicidad" && <Publicidad cliente={cliente} />}
          {activeSubTab === "garantias anexo" && (
            <GarantiasAnexo cliente={cliente} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentosLegales;
