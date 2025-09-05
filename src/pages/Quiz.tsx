import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trophy, 
  ArrowLeft,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const quizData: Question[] = [
  {
    id: 1,
    question: "What does P/E ratio stand for in stock analysis?",
    options: [
      "Price to Earnings ratio",
      "Profit to Expense ratio", 
      "Price to Equity ratio",
      "Portfolio to Earnings ratio"
    ],
    correctAnswer: 0,
    explanation: "P/E ratio (Price-to-Earnings ratio) is a valuation metric that compares a company's current share price to its earnings per share.",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which of the following is considered a defensive stock?",
    options: [
      "Technology startups",
      "Utility companies",
      "Cryptocurrency exchanges",
      "Gaming companies"
    ],
    correctAnswer: 1,
    explanation: "Utility companies are considered defensive stocks because they provide essential services and tend to be stable during economic downturns.",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "What is the maximum daily price movement allowed for most stocks on NSE?",
    options: [
      "5%",
      "10%",
      "20%",
      "No limit"
    ],
    correctAnswer: 2,
    explanation: "NSE has a 20% circuit limit for most stocks, meaning they can't move more than 20% up or down in a single trading day.",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "Which Greek letter measures an option's sensitivity to time decay?",
    options: [
      "Delta",
      "Gamma",
      "Theta",
      "Vega"
    ],
    correctAnswer: 2,
    explanation: "Theta measures how much an option's price decreases as time passes, representing time decay.",
    difficulty: "Hard"
  },
  {
    id: 5,
    question: "What is the primary function of SEBI?",
    options: [
      "Setting interest rates",
      "Regulating securities markets",
      "Managing government debt",
      "Controlling inflation"
    ],
    correctAnswer: 1,
    explanation: "SEBI (Securities and Exchange Board of India) is the regulatory body for securities markets in India.",
    difficulty: "Easy"
  }
];

interface QuizProps {
  onBack: () => void;
}

const Quiz = ({ onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(quizData.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleQuizSubmit();
    }
  }, [timeRemaining, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "You must select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (!showExplanation) {
      setShowExplanation(true);
    } else {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(userAnswers[currentQuestion + 1]);
        setShowExplanation(false);
      } else {
        handleQuizSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const handleQuizSubmit = () => {
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === quizData[index].correctAnswer
    ).length;
    
    setScore(correctAnswers);
    setQuizCompleted(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${correctAnswers}/${quizData.length}`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-gradient-success";
      case "Medium": return "bg-gradient-gold";
      case "Hard": return "bg-gradient-primary";
      default: return "bg-gradient-primary";
    }
  };

  const getScoreGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { grade: "A+", color: "text-success" };
    if (percentage >= 80) return { grade: "A", color: "text-success" };
    if (percentage >= 70) return { grade: "B", color: "text-gold" };
    if (percentage >= 60) return { grade: "C", color: "text-gold" };
    return { grade: "F", color: "text-danger" };
  };

  if (quizCompleted) {
    const { grade, color } = getScoreGrade(score, quizData.length);
    const percentage = (score / quizData.length) * 100;
    
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

          <Card className="bg-gradient-hero text-foreground animate-scale-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-white/10 rounded-full w-fit">
                <Trophy className="h-12 w-12" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Quiz Completed!</CardTitle>
              <p className="text-foreground/80">Great job on completing the quiz</p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{score}/{quizData.length}</div>
                  <div className="text-sm text-foreground/80">Correct Answers</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className={`text-2xl font-bold ${color}`}>{grade}</div>
                  <div className="text-sm text-foreground/80">Grade ({percentage.toFixed(0)}%)</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full bg-white/20 hover:bg-white/30"
                  onClick={() => window.location.reload()}
                >
                  Retake Quiz
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={onBack}
                >
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizData[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizData.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quizData.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / quizData.length) * 100} className="h-2" />
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`text-left p-4 h-auto whitespace-normal justify-start transition-all ${
                    selectedAnswer === index 
                      ? showExplanation
                        ? index === question.correctAnswer
                          ? 'border-success bg-success/10 text-success hover:bg-success/20'
                          : 'border-danger bg-danger/10 text-danger hover:bg-danger/20'
                        : 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
                      : showExplanation && index === question.correctAnswer
                        ? 'border-success bg-success/10 text-success'
                        : 'hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {showExplanation && selectedAnswer === index && (
                      isCorrect ? <CheckCircle2 className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-danger" />
                    )}
                    {showExplanation && index === question.correctAnswer && selectedAnswer !== index && (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                variant={showExplanation ? "default" : "outline"}
              >
                {!showExplanation ? "Submit Answer" : 
                 currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;