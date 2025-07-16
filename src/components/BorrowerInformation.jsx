import React from 'react';
import {useForm} from '../context/FormContext';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiArrowRight,FiArrowLeft,FiX}=FiIcons;

const BorrowerInformation=()=> {
  const {formData,updateFormData,clearFormField}=useForm();
  const navigate=useNavigate();

  const handleNext=()=> {
    navigate('/employment');
  };

  const handlePrevious=()=> {
    navigate('/property');
  };

  const renderFormField=(label,field,type='text',placeholder='',rows=null)=> {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex items-start">
          {rows ? (
            <textarea
              value={formData[field] || ''}
              onChange={(e)=> updateFormData(field,e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
              rows={rows}
            />
          ) : (
            <input
              type={type}
              value={formData[field] || ''}
              onChange={(e)=> updateFormData(field,e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
          )}
          <button
            onClick={()=> clearFormField(field)}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
            title="Clear field"
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderRadioGroup=(label,field,options,clearable=true)=> {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex flex-wrap items-center gap-4">
          {options.map((option)=> (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={field}
                value={typeof option==='string' ? option.toLowerCase() : option}
                checked={formData[field]===(typeof option==='string' ? option.toLowerCase() : option)}
                onChange={(e)=> updateFormData(field,e.target.value)}
                className="mr-2 text-blue-600"
              />
              {option}
            </label>
          ))}
          {clearable && formData[field] && (
            <button
              onClick={()=> clearFormField(field)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              title="Clear selection"
            >
              <SafeIcon icon={FiX} className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{opacity: 0,y: 20}}
      animate={{opacity: 1,y: 0}}
      transition={{duration: 0.5}}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Borrower Information</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Borrower Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Borrower</h3>
          {renderFormField("Borrower's Name (include Jr. or Sr. if applicable)",'borrowerName')}
          
          <div className="grid grid-cols-1 gap-4">
            {renderFormField("Home Phone (incl. area code)",'borrowerPhone','tel',"(XXX) XXX-XXXX")}
          </div>
          
          {renderRadioGroup("Marital Status",'borrowerMaritalStatus',['Married','Unmarried','Separated'])}
          
          <div className="grid grid-cols-2 gap-4">
            {renderFormField("Dependents (not listed by Co-Borrower) - No.",'borrowerDependents','number')}
            {renderFormField("Ages",'borrowerDependentAges','text',"e.g.,5,8,12")}
          </div>
          
          {renderFormField("Present Address (street,city,state,ZIP)",'borrowerPresentAddress','text',"",2)}
          
          <div className="grid grid-cols-2 gap-4">
            {renderRadioGroup("Own/Rent",'borrowerOwnRent',['Own','Rent'])}
            {renderFormField("No. Yrs.",'borrowerYearsAtAddress','number')}
          </div>
        </div>

        {/* Co-Borrower Column */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Co-Borrower</h3>
          {renderFormField("Co-Borrower's Name (include Jr. or Sr. if applicable)",'coBorrowerName')}
          
          <div className="grid grid-cols-1 gap-4">
            {renderFormField("Home Phone (incl. area code)",'coBorrowerPhone','tel',"(XXX) XXX-XXXX")}
          </div>
          
          {renderRadioGroup("Marital Status",'coBorrowerMaritalStatus',['Married','Unmarried','Separated'])}
          
          <div className="grid grid-cols-2 gap-4">
            {renderFormField("Dependents (not listed by Borrower) - No.",'coBorrowerDependents','number')}
            {renderFormField("Ages",'coBorrowerDependentAges','text',"e.g.,5,8,12")}
          </div>
          
          {renderFormField("Present Address (street,city,state,ZIP)",'coBorrowerPresentAddress','text',"",2)}
          
          <div className="grid grid-cols-2 gap-4">
            {renderRadioGroup("Own/Rent",'coBorrowerOwnRent',['Own','Rent'])}
            {renderFormField("No. Yrs.",'coBorrowerYearsAtAddress','number')}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          onClick={handlePrevious}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Previous</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
        >
          <span>Next: Employment Information</span>
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BorrowerInformation;