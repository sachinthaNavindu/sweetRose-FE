import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { User, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="min-h-[80vh] gradient-hero py-20">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background rounded-3xl shadow-elevated p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center mb-4">
              <User size={28} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Delivery address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity mt-2"
            >
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </form>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full py-2 mt-4 text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Sign Out
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
