
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, User, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ toggleDarkMode, isDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="tokponla-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tokponla-primary to-tokponla-accent flex items-center justify-center">
                <span className="text-white font-bold">TE</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">TokponlaEngagé</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/projects" className="text-foreground hover:text-tokponla-primary transition-colors">
              Projets
            </Link>
            <Link to="/map" className="text-foreground hover:text-tokponla-primary transition-colors">
              Carte
            </Link>
            <Link to="/about" className="text-foreground hover:text-tokponla-primary transition-colors">
              À propos
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 pr-4 py-2 text-sm rounded-full border border-input bg-background"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-foreground"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Bell size={20} />
            </Button>
            <Button variant="default" className="bg-tokponla-primary hover:bg-tokponla-primary/90">
              <User size={18} className="mr-2" />
              <span className="hidden sm:inline-block">Connexion</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/projects"
                className="text-foreground hover:text-tokponla-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projets
              </Link>
              <Link
                to="/map"
                className="text-foreground hover:text-tokponla-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Carte
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-tokponla-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-input bg-background"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
