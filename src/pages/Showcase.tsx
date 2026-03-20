import { useState } from "react";
import { motion } from "framer-motion";
import CakeCard from "@/components/CakeCard";
import { showcaseCakes } from "@/data/cakes";

const categories = [
  { key: "all", label: "All" },
  { key: "signature", label: "Signature" },
  { key: "berry", label: "Berry" },
  { key: "vegan", label: "Vegan" },
  { key: "classic", label: "Classic" },
];

const Showcase = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? showcaseCakes
      : showcaseCakes.filter((c) => c.category === filter);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            🍰 Our Cake Collection
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Discover a world of flavors designed for every occasion. Pick your
            favorites and let us handle the magic!{" "}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat.key
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cake, i) => (
            <CakeCard key={cake.id} cake={cake} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No cakes in this category yet 🪻
          </p>
        )}
      </div>
    </section>
  );
};

export default Showcase;
