import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  TrendingUp, 
  Trophy, 
  Users,
  BookOpen,
  Star,
  PlayCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SiteNavigation from "@/components/SiteNavigation";
import Dashboard from "./Dashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);
  const { toast } = useToast();

  if (showDashboard) {
    return <Dashboard />;
  }

  const handleGetStarted = () => {
    toast({
      title: "Welcome to FinanceAce!",
      description: "Let's begin your financial education journey.",
    });
    setShowDashboard(true);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Master financial concepts through gamified lessons and real-world scenarios"
    },
    {
      icon: TrendingUp,
      title: "Virtual Trading",
      description: "Practice trading with real market data without any financial risk"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and climb leaderboards as you progress through modules"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Learn alongside thousands of students and share your achievements"
    }
  ];

  const stats = [
    { label: "Active Learners", value: "50,000+" },
    { label: "Lessons Completed", value: "2M+" },
    { label: "Success Rate", value: "92%" },
    { label: "Languages", value: "5+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center animate-float">
              <div className="bg-gradient-hero p-4 rounded-2xl shadow-3d hover:shadow-3d-hover transform hover:scale-110 transition-all duration-500 border border-primary-glow/20 backdrop-blur-sm">
                <GraduationCap className="h-12 w-12 text-foreground drop-shadow-lg animate-tilt" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <Badge className="bg-gradient-gold text-gold-foreground px-4 py-2 text-sm font-medium shadow-3d hover:shadow-3d-hover transform hover:scale-105 transition-all duration-300 border border-gold/20">
                SEBI Compliant Financial Education
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-slide-up drop-shadow-2xl">
                Master Finance with
                <br />
                <span className="inline-block animate-depth-pulse">Interactive Learning</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up drop-shadow-md">
                Learn stock market fundamentals, practice virtual trading, and build confidence 
                with our gamified financial education platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              {user ? (
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="text-lg px-8 py-6 group"
                >
                  <PlayCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Continue Learning
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  size="lg" 
                  asChild
                  className="text-lg px-8 py-6 group"
                >
                  <Link to="/auth">
                    <PlayCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Start Learning Free
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Star className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group animate-scale-in bg-card/30 backdrop-blur-sm rounded-lg p-4 shadow-3d hover:shadow-3d-hover transform hover:scale-110 transition-all duration-300 border border-primary/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary-glow group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose FinanceAce?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines education with practical experience to make learning finance engaging and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-floating transition-all duration-500 animate-scale-in group hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <div className="bg-gradient-primary p-3 rounded-lg mx-auto w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg animate-float">
                    <feature.icon className="h-6 w-6 text-primary-foreground drop-shadow-sm" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-hero shadow-floating animate-scale-in transform hover:scale-105 transition-all duration-500 border border-primary-glow/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            <CardContent className="p-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-lg animate-depth-pulse">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Join thousands of learners who are building their financial knowledge 
                and confidence through our interactive platform.
              </p>
              {user ? (
                <Button 
                  variant="secondary"
                  size="lg" 
                  onClick={handleGetStarted}
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-foreground"
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Continue Learning
                </Button>
              ) : (
                <Button 
                  variant="secondary"
                  size="lg" 
                  asChild
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-foreground"
                >
                  <Link to="/auth">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Begin Learning Now
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
