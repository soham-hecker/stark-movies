import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center pt-16 bg-background">
      <div className="text-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Film className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This content doesn't exist or has been removed.
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 glow"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
