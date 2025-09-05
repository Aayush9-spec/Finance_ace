import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  gradient = 'bg-gradient-primary'
}: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="hover:shadow-floating transition-all duration-300 animate-scale-in hover:scale-105 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-4 w-4 text-foreground drop-shadow-sm" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-1">
          <div className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 drop-shadow-sm">{value}</div>
          {change && (
            <p className={`text-xs ${getChangeColor()} group-hover:opacity-80 transition-opacity`}>
              {change}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};