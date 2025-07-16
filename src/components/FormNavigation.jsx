import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiMapPin, FiUser, FiBriefcase, FiDollarSign, FiFileText } = FiIcons;

const FormNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const steps = [
    { path: '/project', label: 'Project Info', icon: FiHome },
    { path: '/property', label: 'Property Info', icon: FiMapPin },
    { path: '/borrower', label: 'Borrower Info', icon: FiUser },
    { path: '/employment', label: 'Employment', icon: FiBriefcase },
    { path: '/income', label: 'Income', icon: FiDollarSign },
    { path: '/assets', label: 'Assets & Liabilities', icon: FiFileText }
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.path} className="flex items-center">
            <motion.button
              onClick={() => navigate(step.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === step.path
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={step.icon} className="w-5 h-5" />
              <span className="hidden md:block font-medium">{step.label}</span>
            </motion.button>
            
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                currentStepIndex > index ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormNavigation;