import React from 'react';
import { useForm } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiArrowLeft, FiX } = FiIcons;

const PropertyInformation = () => {
  const { formData, updateFormData, clearFormField } = useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/borrower');
  };

  const handlePrevious = () => {
    navigate('/project');
  };

  const calculateTotal = () => {
    const presentValue = parseFloat(formData.presentValueLot?.replace(/[$,]/g, '')) || 0;
    const improvements = parseFloat(formData.costOfImprovements?.replace(/[$,]/g, '')) || 0;
    return (presentValue + improvements).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Property Information and Purpose of Loan</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Property Address (street, city, state & ZIP)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.propertyAddress || ''}
                onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter complete property address"
              />
              <button 
                onClick={() => clearFormField('propertyAddress')}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. of Units
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={formData.numberOfUnits || ''}
                onChange={(e) => updateFormData('numberOfUnits', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
              <button 
                onClick={() => clearFormField('numberOfUnits')}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Complete this line if construction or construction-permanent loan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Lot Acquired
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.yearLotAcquired || ''}
                  onChange={(e) => updateFormData('yearLotAcquired', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="YYYY"
                />
                <button 
                  onClick={() => clearFormField('yearLotAcquired')}
                  className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                  title="Clear field"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {[
              { label: 'Original Cost', field: 'originalCost' },
              { label: 'Amount Existing Liens', field: 'existingLiens' },
              { label: '(a) Present Value of Lot', field: 'presentValueLot' },
              { label: '(b) Cost of Improvements', field: 'costOfImprovements' }
            ].map((item) => (
              <div key={item.field} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.label}
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={formData[item.field] || ''}
                    onChange={(e) => updateFormData(item.field, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$0.00"
                  />
                  <button 
                    onClick={() => clearFormField(item.field)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                    title="Clear field"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total (a + b)
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                {calculateTotal()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          onClick={handlePrevious}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Previous</span>
        </motion.button>
        
        <motion.button
          onClick={handleNext}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Next: Borrower Information</span>
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyInformation;