import React from 'react';
import { useForm } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiArrowLeft, FiX } = FiIcons;

const IncomeInformation = () => {
  const { formData, updateFormData, clearFormField } = useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/assets');
  };

  const handlePrevious = () => {
    navigate('/employment');
  };

  const calculateBorrowerTotal = () => {
    const income = [
      formData.borrowerBaseIncome,
      formData.borrowerOvertime,
      formData.borrowerBonuses,
      formData.borrowerCommissions,
      formData.borrowerDividends,
      formData.borrowerRentalIncome,
      formData.borrowerOtherIncome
    ];
    return income.reduce((total, amount) => {
      const num = parseFloat((amount || '').replace(/[$,]/g, '')) || 0;
      return total + num;
    }, 0);
  };

  const calculateCoBorrowerTotal = () => {
    const income = [
      formData.coBorrowerBaseIncome,
      formData.coBorrowerOvertime,
      formData.coBorrowerBonuses,
      formData.coBorrowerCommissions,
      formData.coBorrowerDividends,
      formData.coBorrowerRentalIncome,
      formData.coBorrowerOtherIncome
    ];
    return income.reduce((total, amount) => {
      const num = parseFloat((amount || '').replace(/[$,]/g, '')) || 0;
      return total + num;
    }, 0);
  };

  const calculateHousingTotal = () => {
    const rent = parseFloat((formData.currentRent || '').replace(/[$,]/g, '')) || 0;
    const mortgage = parseFloat((formData.currentMortgage || '').replace(/[$,]/g, '')) || 0;
    return rent + mortgage;
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const renderIncomeField = (borrowerField, coBorrowerField) => {
    return (
      <>
        <div className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={formData[borrowerField] || ''}
              onChange={(e) => updateFormData(borrowerField, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$0.00"
            />
            <button
              onClick={() => clearFormField(borrowerField)}
              className="ml-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              title="Clear field"
            >
              <SafeIcon icon={FiX} className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={formData[coBorrowerField] || ''}
              onChange={(e) => updateFormData(coBorrowerField, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$0.00"
            />
            <button
              onClick={() => clearFormField(coBorrowerField)}
              className="ml-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              title="Clear field"
            >
              <SafeIcon icon={FiX} className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="px-3 py-2 bg-gray-100 rounded text-gray-700">
          {formatCurrency(
            (parseFloat((formData[borrowerField] || '').replace(/[$,]/g, '')) || 0) +
              (parseFloat((formData[coBorrowerField] || '').replace(/[$,]/g, '')) || 0)
          )}
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Monthly Income and Housing Expense Information</h2>

      <div className="space-y-8">
        {/* Income Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Gross Monthly Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-medium text-gray-700">Income Type</div>
            <div className="font-medium text-gray-700">Borrower</div>
            <div className="font-medium text-gray-700">Co-Borrower</div>
            <div className="font-medium text-gray-700">Total</div>

            {/* Base Employment Income */}
            <div className="text-sm text-gray-600">Base Empl. Income*</div>
            {renderIncomeField('borrowerBaseIncome', 'coBorrowerBaseIncome')}

            {/* Overtime */}
            <div className="text-sm text-gray-600">Overtime</div>
            {renderIncomeField('borrowerOvertime', 'coBorrowerOvertime')}

            {/* Bonuses */}
            <div className="text-sm text-gray-600">Bonuses</div>
            {renderIncomeField('borrowerBonuses', 'coBorrowerBonuses')}

            {/* Commissions */}
            <div className="text-sm text-gray-600">Commissions</div>
            {renderIncomeField('borrowerCommissions', 'coBorrowerCommissions')}

            {/* Dividends/Interest */}
            <div className="text-sm text-gray-600">Dividends/Interest</div>
            {renderIncomeField('borrowerDividends', 'coBorrowerDividends')}

            {/* Net Rental Income */}
            <div className="text-sm text-gray-600">Net Rental Income</div>
            {renderIncomeField('borrowerRentalIncome', 'coBorrowerRentalIncome')}

            {/* Other Income */}
            <div className="text-sm text-gray-600">Other</div>
            {renderIncomeField('borrowerOtherIncome', 'coBorrowerOtherIncome')}

            {/* Totals */}
            <div className="font-bold text-gray-800 border-t pt-2">Total</div>
            <div className="font-bold text-blue-600 border-t pt-2 bg-blue-50 px-3 py-2 rounded">
              {formatCurrency(calculateBorrowerTotal())}
            </div>
            <div className="font-bold text-blue-600 border-t pt-2 bg-blue-50 px-3 py-2 rounded">
              {formatCurrency(calculateCoBorrowerTotal())}
            </div>
            <div className="font-bold text-blue-600 border-t pt-2 bg-blue-50 px-3 py-2 rounded">
              {formatCurrency(calculateBorrowerTotal() + calculateCoBorrowerTotal())}
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-600">
            * Self Employed Borrower(s) may be required to provide additional documentation such as tax returns and
            financial statements.
          </div>
        </div>

        {/* Housing Expenses Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Monthly Housing Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-medium text-gray-700">Expense Type</div>
            <div className="font-medium text-gray-700">Present</div>

            <div className="text-sm text-gray-600">Rent</div>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.currentRent || ''}
                onChange={(e) => updateFormData('currentRent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="$0.00"
              />
              <button
                onClick={() => clearFormField('currentRent')}
                className="ml-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            </div>

            <div className="text-sm text-gray-600">Mortgage Payment</div>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.currentMortgage || ''}
                onChange={(e) => updateFormData('currentMortgage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="$0.00"
              />
              <button
                onClick={() => clearFormField('currentMortgage')}
                className="ml-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                title="Clear field"
              >
                <SafeIcon icon={FiX} className="w-3 h-3" />
              </button>
            </div>

            <div className="font-bold text-gray-800 border-t pt-2">Total</div>
            <div className="font-bold text-blue-600 border-t pt-2 bg-blue-50 px-3 py-2 rounded">
              {formatCurrency(calculateHousingTotal())}
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
          <span>Next: Assets & Liabilities</span>
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default IncomeInformation;