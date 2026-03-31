import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, Leaf } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";
import CakeCard from "@/components/CakeCard";
import { showcaseCakes } from "@/data/cakes";

const Index = () => {
  const featured = showcaseCakes.slice(0, 3);


  return (
    <>
      <section className="gradient-hero min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                🪻 Sweet Rose Signature Collection
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                sweet<span className="text-primary">Rose</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-4 max-w-lg leading-relaxed">
                Premium flavors meeting artistic design. From decadent signature
                layers to silken buttercreams — we bake the centerpieces for
                your most cherished celebrations.{" "}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/showcase"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                >
                  Order a Cake <ArrowRight size={18} />
                </Link>
                <Link
                  to="/special-orders"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  🎂 Wedding Cakes
                </Link>
              </div>
              <div className="flex gap-8 mt-10">
                <div>
                  <p className="text-3xl font-bold text-foreground">50+</p>
                  <p className="text-sm text-muted-foreground">
                    Artisan Flavors
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Natural Ingredients</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroCake}
                  alt="Sweet Rose Signature Masterpiece"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-card px-5 py-3"
              >
                <p className="text-sm font-bold text-foreground">
                  🍰 Bestseller of the Week
                </p>
                <p className="text-xs text-muted-foreground">
                  Signature Rose Velvet
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              🪻 This Week's Collection
            </h2>
            <p className="text-muted-foreground mt-2">
              Artisanal bakes for your most cherished celebrations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/showcase"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
            >
              View All Cakes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Natural Colors",
                desc: "Ube, berry, beetroot & purple sweet potato",
              },
              {
                icon: Leaf,
                title: "Baked Fresh",
                desc: "Every cake made to order, never frozen",
              },
              {
                icon: Truck,
                title: "Fairy Delivery",
                desc: "Same-day delivery in our enchanted zone",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-background/60 backdrop-blur-sm shadow-soft"
              >
                <item.icon size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The ube lavender cake was the star of my bridal shower. So elegant!",
                name: "Isabella",
              },
              {
                quote:
                  "Berry lilac is my new obsession. The purple ombré is perfection.",
                name: "Chloe",
              },
              {
                quote:
                  "Finally a bakery that celebrates purple! The açaí violet was divine.",
                name: "Sophie",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gradient-card rounded-2xl p-8 shadow-soft"
              >
                <p className="text-foreground italic leading-relaxed">
                  "{t.quote}"
                </p>
                <p className="text-sm font-bold text-primary mt-4">
                  — {t.name} ⭑⭑⭑⭑⭑
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            🪻 Join the Sweet Rose Inner Circle
          </h2>
          <p className="text-primary-foreground/80 mt-2">
            Exclusive flavor drops, seasonal specials & baking secrets delivered to you
          </p>
          <Link
            to="/showcase"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 rounded-full bg-background text-primary font-bold hover:bg-background/90 transition-colors"
          >
            Browse Our Cakes <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
