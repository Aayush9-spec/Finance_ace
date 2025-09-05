import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowLeft,
  Target,
  PieChart,
  Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

const riskQuestions: Question[] = [
  {
    id: 1,
    question: "What is your age group?",
    options: [
      { text: "18-25 years", score: 5 },
      { text: "26-35 years", score: 4 },
      { text: "36-50 years", score: 3 },
      { text: "51-60 years", score: 2 },
      { text: "Above 60 years", score: 1 }
    ]
  },
  {
    id: 2,
    question: "What is your investment experience?",
    options: [
      { text: "No prior experience", score: 1 },
      { text: "Less than 2 years", score: 2 },
      { text: "2-5 years", score: 3 },
      { text: "5-10 years", score: 4 },
      { text: "More than 10 years", score: 5 }
    ]
  },
  {
    id: 3,
    question: "What percentage of your income can you invest?",
    options: [
      { text: "Less than 10%", score: 1 },
      { text: "10-20%", score: 2 },
      { text: "20-30%", score: 3 },
      { text: "30-40%", score: 4 },
      { text: "More than 40%", score: 5 }
    ]
  },
  {
    id: 4,
    question: "How would you react to a 20% drop in your portfolio?",
    options: [
      { text: "Panic and sell everything", score: 1 },
      { text: "Sell some investments", score: 2 },
      { text: "Hold and wait", score: 3 },
      { text: "Buy more at lower prices", score: 4 },
      { text: "Invest additional funds", score: 5 }
    ]
  },
  {
    id: 5,
    question: "What is your investment time horizon?",
    options: [
      { text: "Less than 1 year", score: 1 },
      { text: "1-3 years", score: 2 },
      { text: "3-5 years", score: 3 },
      { text: "5-10 years", score: 4 },
      { text: "More than 10 years", score: 5 }
    ]
  },
  {
    id: 6,
    question: "Which statement best describes your investment goal?",
    options: [
      { text: "Capital preservation is most important", score: 1 },
      { text: "Steady income with some growth", score: 2 },
      { text: "Balanced growth and income", score: 3 },
      { text: "Long-term capital appreciation", score: 4 },
      { text: "Maximum growth potential", score: 5 }
    ]
  }
];

interface RiskAssessmentProps {
  onBack: () => void;
}

const RiskAssessment = ({ onBack }: RiskAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [riskProfile, setRiskProfile] = useState<any>(null);
  const { toast } = useToast();

  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < riskQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment(newAnswers);
    }
  };

  const completeAssessment = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((sum, score) => sum + score, 0);
    const maxScore = riskQuestions.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    let profile;
    if (percentage <= 30) {
      profile = {
        type: "Conservative",
        description: "You prefer capital preservation with minimal risk",
        allocation: { equity: 20, debt: 70, others: 10 },
        color: "text-blue-600",
        icon: Shield,
        riskLevel: "Low",
        expectedReturn: "6-8%"
      };
    } else if (percentage <= 50) {
      profile = {
        type: "Moderate Conservative",
        description: "You seek steady returns with limited volatility",
        allocation: { equity: 35, debt: 55, others: 10 },
        color: "text-green-600",
        icon: Target,
        riskLevel: "Low-Medium",
        expectedReturn: "8-10%"
      };
    } else if (percentage <= 70) {
      profile = {
        type: "Balanced",
        description: "You accept moderate risk for reasonable returns",
        allocation: { equity: 55, debt: 35, others: 10 },
        color: "text-yellow-600",
        icon: PieChart,
        riskLevel: "Medium",
        expectedReturn: "10-12%"
      };
    } else if (percentage <= 85) {
      profile = {
        type: "Aggressive",
        description: "You pursue higher returns despite volatility",
        allocation: { equity: 75, debt: 20, others: 5 },
        color: "text-orange-600",
        icon: TrendingUp,
        riskLevel: "High",
        expectedReturn: "12-15%"
      };
    } else {
      profile = {
        type: "Very Aggressive",
        description: "You chase maximum returns accepting high risk",
        allocation: { equity: 90, debt: 5, others: 5 },
        color: "text-red-600",
        icon: AlertTriangle,
        riskLevel: "Very High",
        expectedReturn: "15%+"
      };
    }

    setRiskProfile(profile);
    setAssessmentComplete(true);
    
    toast({
      title: "Risk Assessment Complete!",
      description: `Your risk profile: ${profile.type}`,
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (assessmentComplete && riskProfile) {
    const IconComponent = riskProfile.icon;
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-scale-in">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-4 bg-muted rounded-full w-fit ${riskProfile.color}`}>
                  <IconComponent className="h-12 w-12" />
                </div>
                <CardTitle className="text-2xl">{riskProfile.type} Investor</CardTitle>
                <p className="text-muted-foreground">{riskProfile.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">Risk Level</div>
                    <div className={riskProfile.color}>{riskProfile.riskLevel}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold">Expected Return</div>
                    <div className="text-success">{riskProfile.expectedReturn}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Recommended Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Equity</span>
                      <span className="font-medium">{riskProfile.allocation.equity}%</span>
                    </div>
                    <Progress value={riskProfile.allocation.equity} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Debt</span>
                      <span className="font-medium">{riskProfile.allocation.debt}%</span>
                    </div>
                    <Progress value={riskProfile.allocation.debt} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Others (Gold, REITs)</span>
                      <span className="font-medium">{riskProfile.allocation.others}%</span>
                    </div>
                    <Progress value={riskProfile.allocation.others} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Investment Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    Growth Strategy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {riskProfile.type === "Conservative" ? 
                      "Focus on dividend-paying stocks and blue-chip companies" :
                      riskProfile.type === "Very Aggressive" ?
                      "Consider growth stocks and emerging market exposure" :
                      "Mix of value and growth stocks with regular rebalancing"
                    }
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    Risk Management
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {riskProfile.type === "Conservative" ? 
                      "Maintain emergency fund and stick to quality investments" :
                      "Use stop-loss orders and diversification to manage risk"
                    }
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gold" />
                    Time Horizon
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {riskProfile.type === "Conservative" ? 
                      "Short to medium-term investments with regular reviews" :
                      "Long-term wealth creation with patient capital approach"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              Retake Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onBack}
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = riskQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / riskQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Risk Assessment</h1>
          <p className="text-muted-foreground">
            Answer a few questions to determine your investment risk profile
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {riskQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left p-4 h-auto whitespace-normal justify-start hover:border-primary/50 hover:bg-primary/5"
                onClick={() => handleAnswerSelect(option.score)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option.text}</span>
                </div>
              </Button>
            ))}
          </CardContent>
          
          {currentQuestion > 0 && (
            <div className="px-6 pb-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RiskAssessment;