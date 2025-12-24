import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Tv, Sparkles, Home, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import StarkMoviesLogo from '../assets/stark-movies-logo.jpeg';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/tv', label: 'TV Series', icon: Tv },
  { to: '/anime', label: 'Anime', icon: Sparkles },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center glow transition-transform group-hover:scale-110">
              {/* <Film className="w-5 h-5 text-primary-foreground" /> */}
              <img src={StarkMoviesLogo} alt="Stark Movies" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              Stark<span className="text-primary">Movies</span>
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-xl mx-2 md:mx-4">
            <SearchBar compact />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to ||
                (to !== '/' && location.pathname.startsWith(to));

              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to ||
                  (to !== '/' && location.pathname.startsWith(to));

                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
