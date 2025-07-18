import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Project Information
    projectDescription: '',
    ownsLand: '',
    landPurchaseDate: '',
    landBalance: '',
    expectedLoanAmount: '',
    estimatedConstructionCost: '',
    prepaidCosts: '',
    estimatedFinishedValue: '',
    creditScore: '',

    // Property Information
    propertyAddress: '',
    numberOfUnits: '',
    yearLotAcquired: '',
    originalCost: '',
    existingLiens: '',
    presentValueLot: '',
    costOfImprovements: '',

    // Borrower Information
    borrowerName: '',
    borrowerPhone: '',
    borrowerMaritalStatus: '',
    borrowerDependents: '',
    borrowerDependentAges: '',
    borrowerPresentAddress: '',
    borrowerOwnRent: '',
    borrowerYearsAtAddress: '',
    borrowerMailingAddress: '',
    borrowerFormerAddress: '',
    borrowerFormerOwnRent: '',
    borrowerFormerYears: '',

    // Co-Borrower Information
    coBorrowerName: '',
    coBorrowerPhone: '',
    coBorrowerMaritalStatus: '',
    coBorrowerDependents: '',
    coBorrowerDependentAges: '',
    coBorrowerPresentAddress: '',
    coBorrowerOwnRent: '',
    coBorrowerYearsAtAddress: '',
    coBorrowerMailingAddress: '',
    coBorrowerFormerAddress: '',
    coBorrowerFormerOwnRent: '',
    coBorrowerFormerYears: '',

    // Employment Information
    borrowerEmployer: '',
    borrowerSelfEmployed: false,
    borrowerYearsJob: '',
    borrowerYearsField: '',
    borrowerPosition: '',
    borrowerBusinessPhone: '',
    coBorrowerEmployer: '',
    coBorrowerSelfEmployed: false,
    coBorrowerYearsJob: '',
    coBorrowerYearsField: '',
    coBorrowerPosition: '',
    coBorrowerBusinessPhone: '',

    // Income Information
    borrowerBaseIncome: '',
    borrowerOvertime: '',
    borrowerBonuses: '',
    borrowerCommissions: '',
    borrowerDividends: '',
    borrowerRentalIncome: '',
    borrowerOtherIncome: '',
    coBorrowerBaseIncome: '',
    coBorrowerOvertime: '',
    coBorrowerBonuses: '',
    coBorrowerCommissions: '',
    coBorrowerDividends: '',
    coBorrowerRentalIncome: '',
    coBorrowerOtherIncome: '',

    // Housing Expenses
    currentRent: '',
    currentMortgage: '',
    proposedMortgage: '',
    otherFinancing: '',
    hazardInsurance: '',
    realEstateTaxes: '',
    mortgageInsurance: '',
    hoaDues: '',
    otherExpenses: '',

    // Assets and Liabilities
    cashDeposit: '',
    checkingAccounts: [],
    savingsAccounts: [],
    stocksBonds: '',
    lifeInsurance: '',
    realEstateOwned: '',
    retirementFunds: '',
    businessNetWorth: '',
    automobiles: '',
    otherAssets: '',
    liabilities: [],
    realEstateProperties: []
  });

  // Section to field mapping
  const sectionFieldMap = {
    projectInfo: [
      'projectDescription',
      'ownsLand',
      'landPurchaseDate',
      'landBalance',
      'expectedLoanAmount',
      'estimatedConstructionCost',
      'prepaidCosts',
      'estimatedFinishedValue',
      'creditScore'
    ],
    propertyInfo: [
      'propertyAddress',
      'numberOfUnits',
      'yearLotAcquired',
      'originalCost',
      'existingLiens',
      'presentValueLot',
      'costOfImprovements'
    ],
    borrowerInfo: [
      'borrowerName',
      'borrowerPhone',
      'borrowerMaritalStatus',
      'borrowerDependents',
      'borrowerDependentAges',
      'borrowerPresentAddress',
      'borrowerOwnRent',
      'borrowerYearsAtAddress',
      'borrowerMailingAddress',
      'borrowerFormerAddress',
      'borrowerFormerOwnRent',
      'borrowerFormerYears'
    ],
    coBorrowerInfo: [
      'coBorrowerName',
      'coBorrowerPhone',
      'coBorrowerMaritalStatus',
      'coBorrowerDependents',
      'coBorrowerDependentAges',
      'coBorrowerPresentAddress',
      'coBorrowerOwnRent',
      'coBorrowerYearsAtAddress',
      'coBorrowerMailingAddress',
      'coBorrowerFormerAddress',
      'coBorrowerFormerOwnRent',
      'coBorrowerFormerYears'
    ],
    employmentInfo: [
      'borrowerEmployer',
      'borrowerSelfEmployed',
      'borrowerYearsJob',
      'borrowerYearsField',
      'borrowerPosition',
      'borrowerBusinessPhone',
      'coBorrowerEmployer',
      'coBorrowerSelfEmployed',
      'coBorrowerYearsJob',
      'coBorrowerYearsField',
      'coBorrowerPosition',
      'coBorrowerBusinessPhone'
    ],
    incomeInfo: [
      'borrowerBaseIncome',
      'borrowerOvertime',
      'borrowerBonuses',
      'borrowerCommissions',
      'borrowerDividends',
      'borrowerRentalIncome',
      'borrowerOtherIncome',
      'coBorrowerBaseIncome',
      'coBorrowerOvertime',
      'coBorrowerBonuses',
      'coBorrowerCommissions',
      'coBorrowerDividends',
      'coBorrowerRentalIncome',
      'coBorrowerOtherIncome'
    ],
    housingExpenses: [
      'currentRent',
      'currentMortgage',
      'proposedMortgage',
      'otherFinancing',
      'hazardInsurance',
      'realEstateTaxes',
      'mortgageInsurance',
      'hoaDues',
      'otherExpenses'
    ],
    assets: [
      'cashDeposit',
      'checkingAccounts',
      'savingsAccounts',
      'stocksBonds',
      'lifeInsurance',
      'realEstateOwned',
      'retirementFunds',
      'businessNetWorth',
      'automobiles',
      'otherAssets'
    ],
    liabilities: [
      'liabilities',
      'realEstateProperties'
    ]
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFormField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? [] : ''
    }));
  };

  const clearFormSection = (sectionId) => {
    if (!sectionFieldMap[sectionId]) {
      console.error(`Section ${sectionId} not found in section map`);
      return;
    }

    const updatedData = { ...formData };
    sectionFieldMap[sectionId].forEach(field => {
      updatedData[field] = Array.isArray(updatedData[field]) ? [] : '';
    });
    setFormData(updatedData);
  };

  const clearAllFormData = () => {
    const emptyData = {};
    // Create an empty version of all fields
    Object.keys(formData).forEach(key => {
      emptyData[key] = Array.isArray(formData[key]) ? [] : '';
    });
    setFormData(emptyData);
  };

  const updateArrayField = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const clearArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: []
    }));
  };

  // Function to clear a specific property in an array item
  const clearArrayItemProperty = (field, index, property) => {
    setFormData(prev => {
      const updatedArray = [...prev[field]];
      if (updatedArray[index]) {
        updatedArray[index] = {
          ...updatedArray[index],
          [property]: ''
        };
      }
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        clearFormField,
        clearFormSection,
        clearAllFormData,
        updateArrayField,
        addArrayItem,
        removeArrayItem,
        clearArrayField,
        clearArrayItemProperty
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;