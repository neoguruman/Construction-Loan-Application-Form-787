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
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name & Address of Employer
            </label>
            <div className="flex items-start">
              <textarea
                value={formData.borrowerEmployer || ''}
                onChange={(e) => updateFormData('borrowerEmployer', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Company Name&#10;Street Address&#10;City, State ZIP"
              />
              <button
                onClick={() => clearFormField('borrowerEmployer')}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="form-field">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.borrowerSelfEmployed || false}
                onChange={(e) => updateFormData('borrowerSelfEmployed', e.target.checked)}
                className="mr-2 text-blue-600"
              />
              Self Employed
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yrs. on this job
              </label>
              <input
                type="number"
                value={formData.borrowerYearsJob || ''}
                onChange={(e) => updateFormData('borrowerYearsJob', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
              />
            </div>
            <div className="form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yrs. employed in this line of work/profession
              </label>
              <input
                type="number"
                value={formData.borrowerYearsField || ''}
                onChange={(e) => updateFormData('borrowerYearsField', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
              />
            </div>
          </div>
          {renderFormField('Position/Title/Type of Business', 'borrowerPosition')}
          {renderFormField('Business Phone (incl. area code)', 'borrowerBusinessPhone', 'tel', '(XXX) XXX-XXXX')}
        </div>

        {/* Co-Borrower Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Co-Borrower</h3>
          <div className="form-field">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name & Address of Employer
            </label>
            <div className="flex items-start">
              <textarea
                value={formData.coBorrowerEmployer || ''}
                onChange={(e) => updateFormData('coBorrowerEmployer', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Company Name&#10;Street Address&#10;City, State ZIP"
              />
              <button
                onClick={() => clearFormField('coBorrowerEmployer')}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="form-field">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.coBorrowerSelfEmployed || false}
                onChange={(e) => updateFormData('coBorrowerSelfEmployed', e.target.checked)}
                className="mr-2 text-blue-600"
              />
              Self Employed
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yrs. on this job
              </label>
              <input
                type="number"
                value={formData.coBorrowerYearsJob || ''}
                onChange={(e) => updateFormData('coBorrowerYearsJob', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
              />
            </div>
            <div className="form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yrs. employed in this line of work/profession
              </label>
              <input
                type="number"
                value={formData.coBorrowerYearsField || ''}
                onChange={(e) => updateFormData('coBorrowerYearsField', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                step="0.1"
              />
            </div>
          </div>
          {renderFormField('Position/Title/Type of Business', 'coBorrowerPosition')}
          {renderFormField('Business Phone (incl. area code)', 'coBorrowerBusinessPhone', 'tel', '(XXX) XXX-XXXX')}
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