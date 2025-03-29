
export interface LoanFormData {
  loan_id: string;
  no_of_dependents: number;
  education: string;
  self_employed: string;
  income_annual: number;
  loan_amount: number;
  loan_term: number;
  cibil_score: number;
  residential_assets_value: number;
  commercial_assets_value: number;
  luxury_assets_value: number;
  bank_asset_value: number;
}

export interface PredictionResult {
  modelType: string;
  approved: boolean;
  probability?: number;
}

export type ModelType = 'RandomForest' | 'XGBoost';
