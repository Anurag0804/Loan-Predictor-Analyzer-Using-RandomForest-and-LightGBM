
import { LoanFormData, ModelType, PredictionResult } from "@/types/loanTypes";

// This is a mock service that simulates model predictions
// In a real application, you would call an API endpoint that uses the actual models
export const predictLoanApproval = (formData: LoanFormData, modelType: ModelType): PredictionResult => {
  // Simulate model processing (random results for demo purposes)
  // In a real app, this would call your backend API with the actual models
  
  // Convert categorical values to one-hot encoding format
  // (similar to how the training data was prepared)
  const processedData = {
    ...formData,
    education_Graduate: formData.education === 'Graduate' ? 1 : 0,
    education_Not_Graduate: formData.education === 'Not Graduate' ? 1 : 0,
    self_employed_No: formData.self_employed === 'No' ? 1 : 0,
    self_employed_Yes: formData.self_employed === 'Yes' ? 1 : 0,
  };
  
  // Factors that generally improve loan approval chances
  const positiveFactors = [
    processedData.cibil_score > 700, // Good credit score
    processedData.income_annual > 3 * processedData.loan_amount, // Income is 3x loan amount
    processedData.education_Graduate === 1, // Graduate education
    processedData.bank_asset_value > processedData.loan_amount * 0.5, // Significant bank assets
    (processedData.residential_assets_value + processedData.commercial_assets_value) > processedData.loan_amount, // Assets > loan amount
  ];
  
  // Count positive factors
  const positiveCount = positiveFactors.filter(Boolean).length;
  
  // Calculate approval probability (more positive factors = higher chance)
  // We'll make XGBoost slightly more conservative than RandomForest
  let baseProbability = positiveCount / positiveFactors.length;
  
  // Add some randomness but weighted toward the calculated probability
  let probability = baseProbability * 0.8 + Math.random() * 0.2;
  
  // Adjust based on model type (just for demo differentiation)
  if (modelType === 'XGBoost') {
    // Make XGBoost slightly more conservative
    probability *= 0.95;
  }
  
  // Threshold for approval
  const approved = probability > 0.5;
  
  return {
    modelType,
    approved,
    probability: Math.round(probability * 100) / 100 // Round to 2 decimal places
  };
};
