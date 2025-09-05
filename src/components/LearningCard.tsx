import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, Trophy, Clock } from "lucide-react";

interface LearningCardProps {
  title: string;
  description: string;
  progress: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  isCompleted?: boolean;
  onStart: () => void;
}

export const LearningCard = ({
  title,
  description,
  progress,
  duration,
  difficulty,
  isCompleted = false,
  onStart
}: LearningCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-gradient-success";
      case "Intermediate": return "bg-gradient-gold";
      case "Advanced": return "bg-gradient-primary";
      default: return "bg-gradient-primary";
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 animate-scale-in cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary-glow transition-colors">
              {title}
            </CardTitle>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          {isCompleted && (
            <Trophy className="h-5 w-5 text-gold ml-2 flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <Badge 
            className={`${getDifficultyColor(difficulty)} text-foreground text-xs px-2 py-1`}
          >
            {difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            {duration}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Button 
            onClick={onStart}
            variant={isCompleted ? "secondary" : "default"}
            className="w-full group-hover:scale-105 transition-transform"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            {isCompleted ? "Review" : progress > 0 ? "Continue" : "Start Learning"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};