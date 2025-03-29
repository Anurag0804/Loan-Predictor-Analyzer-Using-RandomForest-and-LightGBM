
import React from 'react';
import { Building2, Calculator } from "lucide-react";

const LoanHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-2 text-loan-blue">
        <Building2 size={32} />
        <h1 className="text-3xl font-bold">LoanPredictor</h1>
        <Calculator size={24} />
      </div>
      <p className="text-loan-dark-gray text-center mt-2 max-w-2xl">
        Find out your chances of loan approval using advanced ML models.
        Fill in your details below and select either RandomForest or XGBoost prediction model.
      </p>
    </div>
  );
};

export default LoanHeader;
