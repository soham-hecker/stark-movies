import { Link, useLocation } from 'react-router-dom';
import { Film, Tv, Sparkles, Home } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
    { to: '/tv', label: 'TV Series', icon: Tv },
  { to: '/anime', label: 'Anime', icon: Sparkles },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center glow transition-transform group-hover:scale-110">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Stark<span className="text-primary">Movies</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to || 
                (to !== '/' && location.pathname.startsWith(to));
              
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
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

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-2">
            {navLinks.map(({ to, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`p-2 rounded-lg transition-all ${
                    isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
