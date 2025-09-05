import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeSelector } from "@/components/ThemeSelector";

const SiteNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">FinanceAce</h1>
              <p className="text-xs text-muted-foreground">Learn • Practice • Succeed</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#learn" className="text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </a>
            <a href="#trade" className="text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <ThemeSelector />
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/10 pt-4 mt-4 space-y-4">
            <a href="#learn" className="block text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </a>
            <a href="#trade" className="block text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </a>
            <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <div className="pt-2">
              <ThemeSelector />
            </div>
            {user ? (
              <div className="space-y-3">
                <Link to="/profile" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="w-full flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default SiteNavigation;