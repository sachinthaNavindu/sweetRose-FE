import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useTray } from '@/context/TrayContext';

const TrayDrawer = () => {
  const { items, isOpen, setIsOpen, removeFromTray, updateQuantity, totalPrice, clearTray } = useTray();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-elevated flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                Your Tray
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-medium">Your tray is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Add some delicious cakes!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <div key={item.cake.id} className="flex gap-4 p-3 rounded-xl bg-card">
                      <img src={item.cake.image} alt={item.cake.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{item.cake.name}</h4>
                        <p className="text-primary font-bold mt-1">${item.cake.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.cake.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cake.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromTray(item.cake.id)}
                            className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 rounded-full gradient-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                  Checkout
                </button>
                <button
                  onClick={clearTray}
                  className="w-full py-2 mt-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear Tray
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrayDrawer;
