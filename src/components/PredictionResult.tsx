
import React from 'react';
import { PredictionResult } from '@/types/loanTypes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface PredictionResultProps {
  result: PredictionResult | null;
  onReset: () => void;
}

const PredictionResultDisplay: React.FC<PredictionResultProps> = ({ result, onReset }) => {
  if (!result) return null;

  const { approved, probability = 0, modelType } = result;
  const probabilityPercentage = Math.round(probability * 100);

  return (
    <Card className={`w-full max-w-md mx-auto shadow-lg border-t-4 ${approved ? 'border-t-loan-green' : 'border-t-loan-red'} mt-8`}>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Loan Prediction</CardTitle>
          <BarChart3 className="h-5 w-5 text-loan-dark-blue" />
        </div>
        <p className="text-sm text-muted-foreground">Using {modelType} model</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center py-4">
          {approved ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-16 w-16 text-loan-green mb-2" />
              <p className="text-xl font-semibold text-loan-green">Approved</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <XCircle className="h-16 w-16 text-loan-red mb-2" />
              <p className="text-xl font-semibold text-loan-red">Rejected</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Probability</span>
            <span className="text-sm font-medium">{probabilityPercentage}%</span>
          </div>
          <Progress value={probabilityPercentage} className={`h-2 ${approved ? 'bg-green-100' : 'bg-red-100'}`} />
        </div>

        <div className="mt-6 p-4 bg-loan-gray rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-loan-blue mt-0.5 flex-shrink-0" />
            <p className="text-sm text-loan-dark-gray">
              {approved
                ? "Based on the information provided, our model predicts that your loan application is likely to be approved. However, final approval depends on the lender's policies and additional verification."
                : "Based on the information provided, our model predicts that your loan application may not be approved. Consider improving your credit score or adjusting the loan amount to increase your chances."}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} variant="outline" className="w-full">
          Start New Prediction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PredictionResultDisplay;
