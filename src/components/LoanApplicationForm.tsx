import React, { useState } from 'react';
import { LoanFormData, ModelType } from '@/types/loanTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface LoanApplicationFormProps {
  onSubmit: (data: LoanFormData, modelType: ModelType) => void;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoanFormData>({
    no_of_dependents: 0,
    education: 'Graduate',
    self_employed: 'No',
    income_annual: 0,
    loan_amount: 0,
    loan_term: 12,
    cibil_score: 750,
    residential_assets_value: 0,
    commercial_assets_value: 0,
    luxury_assets_value: 0
  });

  const [modelType, setModelType] = useState<ModelType>('RandomForest');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow empty string to be converted to 0 for numeric fields
    const numericValue = value === '' ? 0 : Number(value);
    setFormData({
      ...formData,
      [name]: numericValue
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleModelChange = (value: string) => {
    setModelType(value as ModelType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, modelType);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-t-4 border-t-loan-blue">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="loan-input-group">
            <div className="space-y-2">
              <Label htmlFor="no_of_dependents">Number of Dependents</Label>
              <Input
                id="no_of_dependents"
                name="no_of_dependents"
                type="number"
                min="0"
                placeholder="0"
                value={formData.no_of_dependents}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Select name="education" onValueChange={(value) => handleSelectChange('education', value)} defaultValue={formData.education}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Not Graduate">Not Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="self_employed">Self Employed</Label>
              <Select name="self_employed" onValueChange={(value) => handleSelectChange('self_employed', value)} defaultValue={formData.self_employed}>
                <SelectTrigger>
                  <SelectValue placeholder="Self employed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="loan-input-group">
            <div className="space-y-2">
              <Label htmlFor="income_annual">Annual Income (₹)</Label>
              <Input
                id="income_annual"
                name="income_annual"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your annual income"
                value={formData.income_annual || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan_amount">Loan Amount (₹)</Label>
              <Input
                id="loan_amount"
                name="loan_amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter loan amount"
                value={formData.loan_amount || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan_term">Loan Term (months)</Label>
              <Input
                id="loan_term"
                name="loan_term"
                type="number"
                min="1"
                placeholder="12"
                value={formData.loan_term}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="loan-input-group">
            <div className="space-y-2">
              <Label htmlFor="cibil_score">CIBIL Score</Label>
              <Input
                id="cibil_score"
                name="cibil_score"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your CIBIL score (300-900)"
                value={formData.cibil_score || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="residential_assets_value">Residential Assets Value (₹)</Label>
              <Input
                id="residential_assets_value"
                name="residential_assets_value"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter residential assets value"
                value={formData.residential_assets_value === 0 ? '0' : formData.residential_assets_value || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commercial_assets_value">Commercial Assets Value (₹)</Label>
              <Input
                id="commercial_assets_value"
                name="commercial_assets_value"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter commercial assets value"
                value={formData.commercial_assets_value === 0 ? '0' : formData.commercial_assets_value || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="loan-input-group">
            <div className="space-y-2">
              <Label htmlFor="luxury_assets_value">Luxury Assets Value (₹)</Label>
              <Input
                id="luxury_assets_value"
                name="luxury_assets_value"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter luxury assets value"
                value={formData.luxury_assets_value === 0 ? '0' : formData.luxury_assets_value || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto space-y-2">
                <Label htmlFor="model_type">Choose Prediction Model</Label>
                <Select onValueChange={handleModelChange} defaultValue={modelType}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RandomForest">Random Forest</SelectItem>
                    <SelectItem value="XGBoost">XGBoost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full sm:w-auto bg-loan-blue hover:bg-loan-dark-blue">
                Predict Loan Approval <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;
