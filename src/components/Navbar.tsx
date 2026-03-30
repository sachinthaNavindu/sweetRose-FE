import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useTray } from '@/context/TrayContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/showcase', label: 'Cakes' },
  { to: '/special-orders', label: 'Weddings' },
];

const Navbar = () => {
  const { totalItems, setIsOpen } = useTray();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(()=>{
    if(user){
      console.log("refersh user : ",user)
      console.log(user.name)
    }
  },[user])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="sweetRose" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <User size={16} />
                {user?.name || "USER"}
              </Link>
              <button onClick={logout} className="text-muted-foreground hover:text-primary transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingBag size={20} className="text-foreground" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-semibold py-2 ${
                    location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground py-2">
                    Profile
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm font-semibold text-muted-foreground py-2 text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground py-2">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
