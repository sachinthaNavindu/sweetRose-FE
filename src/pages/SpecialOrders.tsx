import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { specialCakes } from "@/data/cakes";
import weddingCakeImg from "@/assets/wedding-cake.jpg";

const SpecialOrders = () => {
  return (
    <>
      <section className="relative gradient-hero py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Heart size={14} className="inline mr-1" /> Wedding & Special
                Orders
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Your Dream Wedding Cake
              </h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-md leading-relaxed">
                From breathtaking tiered centerpieces to curated dessert tables
                — we craft the perfect sweet finale for your most unforgettable
                moments.{" "}
              </p>
              <a
                href="mailto:hello@waitrose.com"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} />
                Enquire Now
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={weddingCakeImg}
                alt="Wedding cake"
                className="rounded-3xl shadow-elevated w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            🌸 Wedding Collections
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {specialCakes.map((cake, i) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="gradient-card rounded-3xl overflow-hidden shadow-card"
              >
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground">
                    {cake.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {cake.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-primary">
                      from ${cake.price}
                    </span>
                    <a
                      href="mailto:hello@waitrose.com"
                      className="px-6 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      Request Quote
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Share your vision, colours & theme",
              },
              {
                step: "02",
                title: "Tasting",
                desc: "Try our lilac & pink flavour palette",
              },
              {
                step: "03",
                title: "Delivery",
                desc: "We set up your dream display",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6"
              >
                <span className="text-4xl font-bold text-primary/30">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialOrders;
