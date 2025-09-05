import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { LearningCard } from "@/components/LearningCard";
import { TradingCard } from "@/components/TradingCard";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  TrendingUp, 
  Trophy, 
  DollarSign,
  Target,
  Award,
  Clock,
  Users,
  Brain,
  Shield,
  PieChart,
  Bot,
  Languages
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Quiz from "./Quiz";
import RiskAssessment from "./RiskAssessment";
import Portfolio from "./Portfolio";
import AlgoTrading from "./AlgoTrading";
import Language from "./Language";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('learn');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { toast } = useToast();

  const userStats = {
    level: 3,
    points: 2450,
    completedLessons: 15,
    portfolioValue: 10250.50,
    totalReturn: 2.5
  };

  const learningModules = [
    {
      title: "Stock Market Basics",
      description: "Understanding stocks, shares, and market fundamentals",
      progress: 85,
      duration: "30 min",
      difficulty: "Beginner" as const,
      isCompleted: false
    },
    {
      title: "Technical Analysis 101",
      description: "Learn to read charts and identify trading patterns",
      progress: 100,
      duration: "45 min",
      difficulty: "Intermediate" as const,
      isCompleted: true
    },
    {
      title: "Risk Management",
      description: "Protecting your investments and managing portfolio risk",
      progress: 40,
      duration: "25 min",
      difficulty: "Intermediate" as const,
      isCompleted: false
    },
    {
      title: "Options Trading",
      description: "Advanced strategies using options and derivatives",
      progress: 0,
      duration: "60 min",
      difficulty: "Advanced" as const,
      isCompleted: false
    }
  ];

  const stockData = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      price: 2485.50,
      change: 12.30,
      changePercent: 0.50,
      volume: "2.5M"
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3650.25,
      change: -25.75,
      changePercent: -0.70,
      volume: "1.8M"
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      price: 1598.80,
      change: 8.45,
      changePercent: 0.53,
      volume: "3.2M"
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd",
      price: 1456.90,
      change: -18.20,
      changePercent: -1.23,
      volume: "2.9M"
    }
  ];

  const handleStartLesson = () => {
    toast({
      title: "Lesson Started!",
      description: "Welcome to your financial education journey.",
    });
  };

  const handleTrade = (symbol: string, action: 'buy' | 'sell') => {
    toast({
      title: `${action.toUpperCase()} Order Placed`,
      description: `Virtual ${action} order for ${symbol} has been executed.`,
    });
  };

  const handleQuizStart = () => {
    setCurrentPage('quiz');
  };

  const handleRiskAssessment = () => {
    setCurrentPage('risk-assessment');
  };

  const handlePortfolioView = () => {
    setCurrentPage('portfolio');
  };

  const handleAlgoTrading = () => {
    setCurrentPage('algo-trading');
  };

  const handleLanguageSupport = () => {
    setCurrentPage('language');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const renderLearningSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Learning Hub</h2>
          <p className="text-muted-foreground">Master the art of investing through interactive lessons</p>
        </div>
        <Badge className="bg-gradient-gold text-gold-foreground">
          {userStats.completedLessons} Lessons Completed
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Learning Progress"
          value="65%"
          change="+5% this week"
          changeType="positive"
          icon={BookOpen}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Current Streak"
          value="7 days"
          change="Keep it up!"
          changeType="positive"
          icon={Target}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Time Invested"
          value="12.5 hrs"
          change="This month"
          changeType="neutral"
          icon={Clock}
          gradient="bg-gradient-gold"
        />
        <StatsCard
          title="Rank"
          value="#245"
          change="Out of 10,000"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Interactive Learning Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer hover:shadow-floating transition-all duration-300 animate-scale-in group"
          onClick={handleQuizStart}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-4 bg-gradient-primary rounded-xl shadow-3d group-hover:scale-110 transition-transform">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Interactive Quiz</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Test your knowledge with adaptive quizzes</p>
            <Button variant="outline" size="sm" className="w-full">
              Start Quiz
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-floating transition-all duration-300 animate-scale-in group"
          onClick={handleRiskAssessment}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-4 bg-gradient-gold rounded-xl shadow-3d group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-gold-foreground" />
            </div>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Determine your investment risk profile</p>
            <Button variant="outline" size="sm" className="w-full">
              Assess Risk
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-floating transition-all duration-300 animate-scale-in group"
          onClick={handleAlgoTrading}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-4 bg-gradient-success rounded-xl shadow-3d group-hover:scale-110 transition-transform">
              <Bot className="h-8 w-8 text-success-foreground" />
            </div>
            <CardTitle>Algo Trading</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Learn algorithmic trading strategies</p>
            <Button variant="outline" size="sm" className="w-full">
              Explore
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-floating transition-all duration-300 animate-scale-in group"
          onClick={handleLanguageSupport}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 p-4 bg-gradient-hero rounded-xl shadow-3d group-hover:scale-110 transition-transform">
              <Languages className="h-8 w-8 text-foreground" />
            </div>
            <CardTitle>Multi-Language</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Content in regional languages</p>
            <Button variant="outline" size="sm" className="w-full">
              Browse
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {learningModules.map((module, index) => (
          <LearningCard
            key={index}
            {...module}
            onStart={handleStartLesson}
          />
        ))}
      </div>
    </div>
  );

      const renderTradingSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Virtual Trading</h2>
          <p className="text-muted-foreground">Practice trading with real market data (delayed by 15 minutes)</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePortfolioView}>
            <PieChart className="h-4 w-4 mr-2" />
            View Portfolio
          </Button>
          <Button variant="hero" size="lg">
            Reset Portfolio
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Portfolio Value"
          value={`₹${userStats.portfolioValue.toLocaleString()}`}
          change={`+${userStats.totalReturn}% overall`}
          changeType="positive"
          icon={DollarSign}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Today's P&L"
          value="₹125.30"
          change="+1.2%"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Total Trades"
          value="47"
          change="This month"
          changeType="neutral"
          icon={Award}
          gradient="bg-gradient-gold"
        />
        <StatsCard
          title="Win Rate"
          value="68%"
          change="Above average"
          changeType="positive"
          icon={Target}
          gradient="bg-gradient-hero"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stockData.map((stock, index) => (
          <TradingCard
            key={index}
            {...stock}
            onTrade={handleTrade}
          />
        ))}
      </div>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Achievements</h2>
        <p className="text-muted-foreground">Track your learning milestones and trading accomplishments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-gold">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold-foreground">
              <Trophy className="h-5 w-5" />
              First Trade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gold-foreground/80">Completed your first virtual trade</p>
            <Badge className="mt-2 bg-white/20 text-gold-foreground">Unlocked</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success-foreground">
              <Award className="h-5 w-5" />
              Knowledge Seeker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-success-foreground/80">Complete 10 learning modules</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-foreground">
              <Target className="h-5 w-5" />
              Profit Master
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-foreground/80">Achieve 5% portfolio growth</p>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'learn':
        return renderLearningSection();
      case 'trade':
        return renderTradingSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'profile':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Profile Section</h2>
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </div>
        );
      default:
        return renderLearningSection();
    }
  };

  // Handle different page views
  if (currentPage === 'quiz') {
    return <Quiz onBack={handleBackToDashboard} />;
  }
  
  if (currentPage === 'risk-assessment') {
    return <RiskAssessment onBack={handleBackToDashboard} />;
  }
  
  if (currentPage === 'portfolio') {
    return <Portfolio onBack={handleBackToDashboard} />;
  }
  
  if (currentPage === 'algo-trading') {
    return <AlgoTrading onBack={handleBackToDashboard} />;
  }
  
  if (currentPage === 'language') {
    return <Language onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userLevel={userStats.level}
        userPoints={userStats.points}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;