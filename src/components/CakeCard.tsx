import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Cake } from '@/types';
import { useTray } from '@/context/TrayContext';

interface CakeCardProps {
  cake: Cake;
  index?: number;
}

const badgeStyles: Record<string, string> = {
  new: 'gradient-primary text-primary-foreground',
  popular: 'gradient-accent text-primary-foreground',
  vegan: 'bg-emerald-100 text-emerald-700',
  'best seller': 'gradient-primary text-primary-foreground',
};

const CakeCard = ({ cake, index = 0 }: CakeCardProps) => {
  const { addToTray } = useTray();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {cake.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeStyles[cake.badge] || 'bg-muted text-muted-foreground'}`}>
            {cake.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground">{cake.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{cake.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary">${cake.price}</span>
          <button
            onClick={() => addToTray(cake)}
            className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add to Tray
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;
