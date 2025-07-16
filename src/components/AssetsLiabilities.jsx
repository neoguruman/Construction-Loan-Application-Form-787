import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiPlus, FiTrash2, FiCheck, FiEdit, FiX, FiMenu, FiMail } = FiIcons;

const AssetsLiabilities = () => {
  const { formData, updateFormData, addArrayItem, removeArrayItem, updateArrayField, clearFormField, clearArrayField } = useForm();
  const navigate = useNavigate();
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handlePrevious = () => {
    navigate('/income');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('Submitting...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR-ACCESS-KEY', // Replace with your Web3Forms access key
          from_name: formData.borrowerName || 'Construction Loan Applicant',
          to_email: 'rgomez@jumboconstructionloans.com',
          subject: 'New Construction Loan Application',
          message: JSON.stringify(formData, null, 2),
          form_data: formData
        })
      });

      if (response.ok) {
        setSubmitStatus('Application submitted successfully!');
        alert('Your application has been submitted successfully!');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('Failed to submit application. Please try again.');
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component code remains the same until the buttons section

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ... rest of the JSX remains the same until the buttons section ... */}

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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`flex items-center space-x-2 ${
            isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } text-white px-8 py-3 rounded-lg transition-colors text-lg font-semibold`}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        >
          <SafeIcon icon={isSubmitting ? FiMail : FiCheck} className="w-6 h-6" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
        </motion.button>
      </div>

      {submitStatus && (
        <div className={`mt-4 text-center p-3 rounded-lg ${
          submitStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {submitStatus}
        </div>
      )}
    </motion.div>
  );
};

export default AssetsLiabilities;