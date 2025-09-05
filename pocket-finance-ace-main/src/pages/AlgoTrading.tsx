import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  ArrowLeft, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Zap,
  Target,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlgoTradingProps {
  onBack: () => void;
}

const AlgoTrading = ({ onBack }: AlgoTradingProps) => {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [isStrategyRunning, setIsStrategyRunning] = useState(false);
  const { toast } = useToast();

  const strategies = [
    {
      id: "sma_crossover",
      name: "SMA Crossover",
      description: "Buy when short SMA crosses above long SMA, sell when it crosses below",
      difficulty: "Beginner",
      risk: "Low",
      timeframe: "1-4 hours",
      winRate: "65%",
      parameters: {
        shortSMA: 20,
        longSMA: 50,
        stopLoss: 2,
        takeProfit: 4
      }
    },
    {
      id: "bollinger_bands",
      name: "Bollinger Bands",
      description: "Trade based on price movements relative to Bollinger Bands",
      difficulty: "Intermediate",
      risk: "Medium",
      timeframe: "30min-2hours",
      winRate: "58%",
      parameters: {
        period: 20,
        stdDev: 2,
        stopLoss: 1.5,
        takeProfit: 3
      }
    },
    {
      id: "momentum",
      name: "Momentum Strategy",
      description: "Follow strong price movements and momentum indicators",
      difficulty: "Advanced",
      risk: "High",
      timeframe: "5-30 minutes",
      winRate: "72%",
      parameters: {
        rsiPeriod: 14,
        rsiOverbought: 70,
        rsiOversold: 30,
        stopLoss: 3,
        takeProfit: 6
      }
    }
  ];

  const backtestResults = {
    totalTrades: 156,
    winningTrades: 102,
    losingTrades: 54,
    winRate: 65.4,
    totalReturn: 23.7,
    maxDrawdown: -8.2,
    sharpeRatio: 1.45,
    profitFactor: 1.83
  };

  const recentTrades = [
    { time: "09:15", symbol: "RELIANCE", action: "BUY", price: 2485.50, quantity: 10, status: "Filled" },
    { time: "10:30", symbol: "TCS", action: "SELL", price: 3650.25, quantity: 5, status: "Filled" },
    { time: "11:45", symbol: "HDFC", action: "BUY", price: 1598.80, quantity: 8, status: "Pending" },
    { time: "14:20", symbol: "INFY", action: "SELL", price: 1456.90, quantity: 12, status: "Cancelled" }
  ];

  const algoBasics = [
    {
      title: "What is Algorithmic Trading?",
      content: "Algorithmic trading uses computer programs to execute trades based on predefined rules and conditions. It removes emotions from trading and can execute trades faster than humans.",
      icon: Bot
    },
    {
      title: "High-Frequency Trading (HFT)",
      content: "HFT is a subset of algo trading that uses powerful computers to execute thousands of trades in microseconds, profiting from tiny price differences.",
      icon: Zap
    },
    {
      title: "Common Strategies",
      content: "Popular algo strategies include trend following, mean reversion, arbitrage, and momentum trading. Each has different risk-reward profiles.",
      icon: Target
    },
    {
      title: "Risk Management",
      content: "Always use stop-losses, position sizing, and diversification. Algo trading can amplify both profits and losses very quickly.",
      icon: AlertTriangle
    }
  ];

  const handleStartStrategy = () => {
    if (!selectedStrategy) {
      toast({
        title: "No Strategy Selected",
        description: "Please select a strategy before starting",
        variant: "destructive"
      });
      return;
    }
    
    setIsStrategyRunning(true);
    toast({
      title: "Strategy Started",
      description: "Your algorithmic trading strategy is now running",
    });
  };

  const handleStopStrategy = () => {
    setIsStrategyRunning(false);
    toast({
      title: "Strategy Stopped",
      description: "Your algorithmic trading strategy has been stopped",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-gradient-success";
      case "Intermediate": return "bg-gradient-gold";
      case "Advanced": return "bg-gradient-primary";
      default: return "bg-gradient-primary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-gold";
      case "High": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Filled": return "text-success";
      case "Pending": return "text-gold";
      case "Cancelled": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const renderLearning = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Learn Algorithmic Trading</h2>
        <p className="text-muted-foreground">
          Master the fundamentals of automated trading and quantitative strategies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {algoBasics.map((concept, index) => {
          const IconComponent = concept.icon;
          return (
            <Card key={index} className="hover:shadow-elevated transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {concept.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{concept.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-hero text-foreground">
        <CardHeader>
          <CardTitle className="text-center">Ready to Start?</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-foreground/80">
            Practice with paper trading before using real money. Start with simple strategies and gradually increase complexity.
          </p>
          <Button 
            variant="secondary"
            size="lg"
            className="bg-white/20 hover:bg-white/30"
            onClick={() => setActiveTab("strategies")}
          >
            Explore Strategies
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderStrategies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trading Strategies</h2>
          <p className="text-muted-foreground">Choose and customize your algorithmic trading strategy</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${isStrategyRunning ? 'bg-gradient-success' : 'bg-muted'}`}>
            {isStrategyRunning ? 'Running' : 'Stopped'}
          </Badge>
          {isStrategyRunning ? (
            <Button onClick={handleStopStrategy} variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button onClick={handleStartStrategy} size="sm">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {strategies.map((strategy) => (
          <Card 
            key={strategy.id}
            className={`cursor-pointer transition-all hover:shadow-elevated ${
              selectedStrategy === strategy.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedStrategy(strategy.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{strategy.name}</CardTitle>
                <Badge className={getDifficultyColor(strategy.difficulty)}>
                  {strategy.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{strategy.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Risk Level</span>
                  <p className={`font-medium ${getRiskColor(strategy.risk)}`}>{strategy.risk}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Win Rate</span>
                  <p className="font-medium text-success">{strategy.winRate}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Timeframe</span>
                  <p className="font-medium">{strategy.timeframe}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStrategy && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Strategy Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const strategy = strategies.find(s => s.id === selectedStrategy);
              if (!strategy) return null;
              
              return (
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(strategy.parameters).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Input
                        id={key}
                        type="number"
                        defaultValue={value}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBacktest = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Backtesting Results</h2>
        <p className="text-muted-foreground">Historical performance of your selected strategy</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Return</p>
                <p className="text-2xl font-bold">+{backtestResults.totalReturn}%</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Win Rate</p>
                <p className="text-2xl font-bold">{backtestResults.winRate}%</p>
              </div>
              <Target className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-gold-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Sharpe Ratio</p>
                <p className="text-2xl font-bold">{backtestResults.sharpeRatio}</p>
              </div>
              <Activity className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-danger">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Max Drawdown</p>
                <p className="text-2xl font-bold text-danger">{backtestResults.maxDrawdown}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-danger" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trade Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Trades</span>
              <span className="font-medium">{backtestResults.totalTrades}</span>
            </div>
            <div className="flex justify-between">
              <span>Winning Trades</span>
              <span className="font-medium text-success">{backtestResults.winningTrades}</span>
            </div>
            <div className="flex justify-between">
              <span>Losing Trades</span>
              <span className="font-medium text-danger">{backtestResults.losingTrades}</span>
            </div>
            <div className="flex justify-between">
              <span>Profit Factor</span>
              <span className="font-medium">{backtestResults.profitFactor}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded text-xs font-medium ${
                      trade.action === 'BUY' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                    }`}>
                      {trade.action}
                    </div>
                    <div>
                      <p className="font-medium">{trade.symbol}</p>
                      <p className="text-xs text-muted-foreground">{trade.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{trade.price}</p>
                    <p className={`text-xs ${getStatusColor(trade.status)}`}>{trade.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Algorithmic Trading</h1>
          <p className="text-muted-foreground">
            Learn and practice automated trading strategies with virtual money
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="backtest">Backtest</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            {renderLearning()}
          </TabsContent>

          <TabsContent value="strategies">
            {renderStrategies()}
          </TabsContent>

          <TabsContent value="backtest">
            {renderBacktest()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlgoTrading;