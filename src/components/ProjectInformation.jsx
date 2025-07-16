import React from 'react';
import { useForm } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiX } = FiIcons;

const ProjectInformation = () => {
  const { formData, updateFormData, clearFormField } = useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/property');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Construction Project Information</h2>

      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. Description of your construction project?
          </label>
          <div className="flex items-start">
            <textarea
              value={formData.projectDescription || ''}
              onChange={(e) => updateFormData('projectDescription', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Describe your construction project in detail..."
            />
            <button
              onClick={() => clearFormField('projectDescription')}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
              title="Clear field"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. Do you own land?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="ownsLand"
                value="yes"
                checked={formData.ownsLand === 'yes'}
                onChange={(e) => updateFormData('ownsLand', e.target.value)}
                className="mr-2 text-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ownsLand"
                value="no"
                checked={formData.ownsLand === 'no'}
                onChange={(e) => updateFormData('ownsLand', e.target.value)}
                className="mr-2 text-blue-600"
              />
              No
            </label>
            {formData.ownsLand && (
              <button
                onClick={() => clearFormField('ownsLand')}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                title="Clear selection"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3. Date of land purchase?
          </label>
          <div className="flex items-center">
            <input
              type="date"
              value={formData.landPurchaseDate || ''}
              onChange={(e) => updateFormData('landPurchaseDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => clearFormField('landPurchaseDate')}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
              title="Clear field"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {[
          { number: '4', label: 'What is your land balance?', field: 'landBalance' },
          { number: '5', label: 'What loan amount are you expecting to apply for including the land balance?', field: 'expectedLoanAmount' },
          { number: '6', label: 'What is your estimated construction cost total?', field: 'estimatedConstructionCost' },
          { number: '7', label: 'What is your total pre-paid costs to date (i.e., house plans, engineering, grading, permits, etc.)?', field: 'prepaidCosts' },
          { number: '8', label: 'What is the estimated finished value of your home upon completion?', field: 'estimatedFinishedValue' }
        ].map((item) => (
          <div key={item.field} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {item.number}. {item.label}
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

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            9. What is your current credit score?
          </label>
          <div className="flex items-center">
            <select
              value={formData.creditScore || ''}
              onChange={(e) => updateFormData('creditScore', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your credit score range</option>
              <option value="excellent">Excellent (740-850)</option>
              <option value="very-good">Very Good (670-739)</option>
              <option value="good">Good (580-669)</option>
              <option value="fair">Fair (300-579)</option>
              <option value="unknown">I don't know</option>
            </select>
            <button
              onClick={() => clearFormField('creditScore')}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
              title="Clear field"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <motion.button
          onClick={handleNext}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Next: Property Information</span>
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectInformation;