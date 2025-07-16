import React from 'react';
import { useForm } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiArrowLeft, FiX } = FiIcons;

const EmploymentInformation = () => {
  const { formData, updateFormData, clearFormField } = useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/income');
  };

  const handlePrevious = () => {
    navigate('/borrower');
  };

  const renderFormField = (label, field, type = 'text', placeholder = '', rows = null) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex items-start">
          {rows ? (
            <textarea
              value={formData[field] || ''}
              onChange={(e) => updateFormData(field, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
              rows={rows}
            />
          ) : (
            <input
              type={type}
              value={formData[field] || ''}
              onChange={(e) => updateFormData(field, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
          )}
          <button 
            onClick={() => clearFormField(field)}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
            title="Clear field"
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Employment Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Borrower Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Borrower</h3>
          
          {renderFormField("Name & Address of Employer", 'borrowerEmployer', 'text', "Company Name\nStreet Address\nCity, State ZIP", 3)}

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.borrowerSelfEmployed || false}
                onChange={(e) => updateFormData('borrowerSelfEmployed', e.target.checked)}
                className="mr-2 text-blue-600"
              />
              Self Employed
            </label>
            {formData.borrowerSelfEmployed && (
              <button 
                onClick={() => updateFormData('borrowerSelfEmployed', false)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                title="Clear selection"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderFormField("Yrs. on this job", 'borrowerYearsJob', 'number', "0.0")}
            {renderFormField("Yrs. employed in this line of work/profession", 'borrowerYearsField', 'number', "0.0")}
          </div>

          {renderFormField("Position/Title/Type of Business", 'borrowerPosition')}
          {renderFormField("Business Phone (incl. area code)", 'borrowerBusinessPhone', 'tel', "(XXX) XXX-XXXX")}

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              Previous Employment (if less than 2 years at current job)
            </h4>
            
            {renderFormField("Name & Address of Previous Employer", 'borrowerPreviousEmployer', 'text', "Previous Company Name\nStreet Address\nCity, State ZIP", 3)}
            {renderFormField("Monthly Income", 'borrowerPreviousIncome', 'text', "$0.00")}
          </div>
        </div>

        {/* Co-Borrower Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Co-Borrower</h3>
          
          {renderFormField("Name & Address of Employer", 'coBorrowerEmployer', 'text', "Company Name\nStreet Address\nCity, State ZIP", 3)}

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.coBorrowerSelfEmployed || false}
                onChange={(e) => updateFormData('coBorrowerSelfEmployed', e.target.checked)}
                className="mr-2 text-blue-600"
              />
              Self Employed
            </label>
            {formData.coBorrowerSelfEmployed && (
              <button 
                onClick={() => updateFormData('coBorrowerSelfEmployed', false)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                title="Clear selection"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderFormField("Yrs. on this job", 'coBorrowerYearsJob', 'number', "0.0")}
            {renderFormField("Yrs. employed in this line of work/profession", 'coBorrowerYearsField', 'number', "0.0")}
          </div>

          {renderFormField("Position/Title/Type of Business", 'coBorrowerPosition')}
          {renderFormField("Business Phone (incl. area code)", 'coBorrowerBusinessPhone', 'tel', "(XXX) XXX-XXXX")}

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              Previous Employment (if less than 2 years at current job)
            </h4>
            
            {renderFormField("Name & Address of Previous Employer", 'coBorrowerPreviousEmployer', 'text', "Previous Company Name\nStreet Address\nCity, State ZIP", 3)}
            {renderFormField("Monthly Income", 'coBorrowerPreviousIncome', 'text', "$0.00")}
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
          <span>Next: Income Information</span>
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmploymentInformation;