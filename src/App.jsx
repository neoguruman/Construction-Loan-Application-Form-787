import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FormNavigation from './components/FormNavigation';
import ProjectInformation from './components/ProjectInformation';
import PropertyInformation from './components/PropertyInformation';
import BorrowerInformation from './components/BorrowerInformation';
import EmploymentInformation from './components/EmploymentInformation';
import IncomeInformation from './components/IncomeInformation';
import AssetsLiabilities from './components/AssetsLiabilities';
import FormProvider from './context/FormContext';
import './App.css';

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <a
                  href="https://californiaconstructionloans.com/"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">←</span>
                  Back to Home
                </a>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                California Construction Loan Application
              </h1>
              <p className="text-gray-600 mb-2">
                Complete your construction project financing application
              </p>
              <p className="text-green-600 font-bold">
                No Social Security Number Required
              </p>
            </header>

            <FormNavigation />

            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <Routes>
                <Route path="/" element={<ProjectInformation />} />
                <Route path="/project" element={<ProjectInformation />} />
                <Route path="/property" element={<PropertyInformation />} />
                <Route path="/borrower" element={<BorrowerInformation />} />
                <Route path="/employment" element={<EmploymentInformation />} />
                <Route path="/income" element={<IncomeInformation />} />
                <Route path="/assets" element={<AssetsLiabilities />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;