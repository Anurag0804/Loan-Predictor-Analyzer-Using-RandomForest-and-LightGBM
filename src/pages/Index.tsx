
import React, { useState } from 'react';
import LoanHeader from '@/components/LoanHeader';
import LoanApplicationForm from '@/components/LoanApplicationForm';
import PredictionResultDisplay from '@/components/PredictionResult';
import { LoanFormData, ModelType, PredictionResult } from '@/types/loanTypes';
import { predictLoanApproval } from '@/services/modelService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [showForm, setShowForm] = useState(true);
  const { toast } = useToast();

  const handleFormSubmit = (formData: LoanFormData, modelType: ModelType) => {
    try {
      // In a real application, this would call an API that uses the actual models
      const result = predictLoanApproval(formData, modelType);
      
      setPredictionResult(result);
      setShowForm(false);
      
      toast({
        title: "Prediction Complete",
        description: `Loan ${result.approved ? 'approved' : 'rejected'} using ${modelType} model.`,
        variant: result.approved ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: "There was an error processing your loan application.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setPredictionResult(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="container mx-auto">
        <LoanHeader />
        
        <div className="mt-8 flex flex-col items-center">
          {showForm ? (
            <LoanApplicationForm onSubmit={handleFormSubmit} />
          ) : (
            <PredictionResultDisplay result={predictionResult} onReset={handleReset} />
          )}
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>This is a demonstration of machine learning models for loan prediction.</p>
          <p className="mt-1">Results are simulated and should not be used for actual financial decisions.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
