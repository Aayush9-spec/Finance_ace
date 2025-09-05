import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  ArrowLeft,
  Plus,
  Target,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioProps {
  onBack: () => void;
}

const Portfolio = ({ onBack }: PortfolioProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const portfolioData = {
    totalValue: 125750.80,
    totalInvested: 120000.00,
    totalReturns: 5750.80,
    returnsPercent: 4.79,
    dayChange: 890.25,
    dayChangePercent: 0.71
  };

  const holdings = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 25,
      avgPrice: 2350.00,
      currentPrice: 2485.50,
      value: 62137.50,
      returns: 3387.50,
      returnsPercent: 5.77,
      allocation: 49.5
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 10,
      avgPrice: 3500.00,
      currentPrice: 3650.25,
      value: 36502.50,
      returns: 1502.50,
      returnsPercent: 4.29,
      allocation: 29.0
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      quantity: 15,
      avgPrice: 1520.00,
      currentPrice: 1598.80,
      value: 23982.00,
      returns: 1182.00,
      returnsPercent: 5.18,
      allocation: 19.1
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd",
      quantity: 2,
      avgPrice: 1400.00,
      currentPrice: 1456.90,
      value: 2913.80,
      returns: 113.80,
      returnsPercent: 4.06,
      allocation: 2.4
    }
  ];

  const sectorAllocation = [
    { sector: "Information Technology", allocation: 31.4, value: 39416.30, color: "bg-blue-500" },
    { sector: "Oil & Gas", allocation: 49.5, value: 62137.50, color: "bg-green-500" },
    { sector: "Banking & Finance", allocation: 19.1, value: 23982.00, color: "bg-yellow-500" }
  ];

  const performance = [
    { period: "1 Day", return: 0.71, benchmark: 0.45 },
    { period: "1 Week", return: 2.34, benchmark: 1.89 },
    { period: "1 Month", return: 4.79, benchmark: 3.21 },
    { period: "3 Months", return: 12.45, benchmark: 8.76 },
    { period: "1 Year", return: 18.92, benchmark: 15.34 }
  ];

  const recommendations = [
    {
      type: "Rebalance",
      message: "Consider reducing Oil & Gas exposure (currently 49.5%, target: 40%)",
      priority: "Medium",
      icon: Target
    },
    {
      type: "Diversify",
      message: "Add exposure to Healthcare and Consumer sectors",
      priority: "High",
      icon: PieChart
    },
    {
      type: "Review",
      message: "HDFC showing strong momentum, consider booking partial profits",
      priority: "Low",
      icon: TrendingUp
    }
  ];

  const handleBuyMore = (symbol: string) => {
    toast({
      title: "Buy Order Initiated",
      description: `Opening buy order for ${symbol}`,
    });
  };

  const handleSell = (symbol: string) => {
    toast({
      title: "Sell Order Initiated",
      description: `Opening sell order for ${symbol}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-danger";
      case "Medium": return "text-gold";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Value</p>
                <p className="text-2xl font-bold">₹{portfolioData.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Returns</p>
                <p className="text-2xl font-bold">₹{portfolioData.totalReturns.toLocaleString()}</p>
                <p className="text-sm opacity-80">+{portfolioData.returnsPercent}%</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-gold-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Day's Change</p>
                <p className="text-2xl font-bold">₹{portfolioData.dayChange.toLocaleString()}</p>
                <p className="text-sm opacity-80">+{portfolioData.dayChangePercent}%</p>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-hero text-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Invested</p>
                <p className="text-2xl font-bold">₹{portfolioData.totalInvested.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectorAllocation.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{sector.sector}</span>
                  <span className="font-medium">{sector.allocation}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={sector.allocation} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">
                    ₹{sector.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance vs Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performance.map((perf, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{perf.period}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${perf.return >= 0 ? 'text-success' : 'text-danger'}`}>
                      {perf.return >= 0 ? '+' : ''}{perf.return}%
                    </div>
                    <div className="text-xs text-muted-foreground">Portfolio</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${perf.benchmark >= 0 ? 'text-success' : 'text-danger'}`}>
                      {perf.benchmark >= 0 ? '+' : ''}{perf.benchmark}%
                    </div>
                    <div className="text-xs text-muted-foreground">NIFTY 50</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHoldings = () => (
    <div className="space-y-4">
      {holdings.map((holding, index) => (
        <Card key={index} className="hover:shadow-elevated transition-shadow">
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-12 items-center">
              <div className="md:col-span-3">
                <h3 className="font-semibold">{holding.symbol}</h3>
                <p className="text-sm text-muted-foreground">{holding.name}</p>
                <p className="text-xs text-muted-foreground">{holding.quantity} shares</p>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-sm text-muted-foreground">Avg Price</p>
                <p className="font-medium">₹{holding.avgPrice}</p>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="font-medium">₹{holding.currentPrice}</p>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-sm text-muted-foreground">Value</p>
                <p className="font-medium">₹{holding.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{holding.allocation}%</p>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-sm text-muted-foreground">Returns</p>
                <p className={`font-medium ${holding.returns >= 0 ? 'text-success' : 'text-danger'}`}>
                  ₹{holding.returns.toLocaleString()}
                </p>
                <p className={`text-xs ${holding.returns >= 0 ? 'text-success' : 'text-danger'}`}>
                  {holding.returns >= 0 ? '+' : ''}{holding.returnsPercent}%
                </p>
              </div>

              <div className="md:col-span-1 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleBuyMore(holding.symbol)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleSell(holding.symbol)}
                >
                  Sell
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      {recommendations.map((rec, index) => {
        const IconComponent = rec.icon;
        return (
          <Card key={index} className="hover:shadow-elevated transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {rec.type}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm">{rec.message}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
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
          <h1 className="text-3xl font-bold mb-2">Portfolio Management</h1>
          <p className="text-muted-foreground">
            Track your investments and get personalized recommendations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="holdings" className="space-y-6">
            {renderHoldings()}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {renderRecommendations()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;