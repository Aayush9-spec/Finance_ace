import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface TradingCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  onTrade: (symbol: string, action: 'buy' | 'sell') => void;
}

export const TradingCard = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  onTrade
}: TradingCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="hover:shadow-elevated transition-all duration-300 animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{symbol}</CardTitle>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-success" />
          ) : (
            <TrendingDown className="h-5 w-5 text-danger" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold">{price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">Volume: {volume}</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default"
            size="sm"
            className="flex-1 bg-gradient-success hover:opacity-90"
            onClick={() => onTrade(symbol, 'buy')}
          >
            Buy
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 border-danger text-danger hover:bg-danger hover:text-danger-foreground"
            onClick={() => onTrade(symbol, 'sell')}
          >
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};