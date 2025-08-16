import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-lg bg-gradient-primary"
          >
            <Brain className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold text-gradient">MindMap Genius</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative py-2 px-4 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* CTA Button */}
          <Link to="/generator">
            <Button className="bg-gradient-primary hover:opacity-90 text-white font-medium">
              Create Mind Map
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}