import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../assets/LOGo tokponlaEngagé.png'

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
    <nav className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-500 border-b border-border sticky top-0 z-50 shadow-md">
      <div className="tokponla-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full shadow-lg">
                <img src={logo} alt="Logo" className="rounded-full w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg sm:text-2xl hidden sm:inline-block text-yellow-600">
                TokponlaEngagé
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/projects">
                <Button variant="ghost" className="text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md px-3 py-3 font-medium">
                  Projets
                </Button>
              </Link>
              <Link to="/create-project">
                <Button variant="ghost" className="text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md px-3 py-3 font-medium">
                  Proposer un projet
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" className="text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md px-3 py-3 font-medium">
                  À propos
                </Button>
              </Link>
              <div className="relative ml-1 hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-12 pr-6 py-2 text-sm rounded-lg border border-input bg-background hover:border-tokponla-primary/50 focus:border-tokponla-primary focus:ring-2 focus:ring-tokponla-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right icons + buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-foreground hover:bg-muted rounded-md"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted rounded-md relative"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link to="/login">
              <Button
                variant="default"
                className="bg-blue-950 hover:bg-tokponla-primary/90 rounded-md px-4 sm:px-6 py-3 font-medium shadow-lg"
              >
                Connexion
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border bg-background shadow-md">
            <div className="flex flex-col space-y-4">
              <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-left justify-start text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md py-3 font-medium">
                  Projets
                </Button>
              </Link>
              <Link to="/create-project" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-left justify-start text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md py-3 font-medium">
                  Proposer un projet
                </Button>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-left justify-start text-foreground hover:text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md py-3 font-medium">
                  À propos
                </Button>
              </Link>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-6 py-3 text-sm rounded-lg border border-input bg-background hover:border-tokponla-primary/50 focus:border-tokponla-primary focus:ring-2 focus:ring-tokponla-primary/30 transition-all"
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="w-full bg-tokponla-primary hover:bg-tokponla-primary/90 rounded-md px-6 py-3 font-medium shadow-lg">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-tokponla-primary text-tokponla-primary hover:bg-tokponla-primary/10 rounded-md px-6 py-3 font-medium">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
