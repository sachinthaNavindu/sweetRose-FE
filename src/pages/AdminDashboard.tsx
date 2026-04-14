import { motion } from "framer-motion";
import { Cake, ShoppingCart, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "128",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$2,450",
    icon: DollarSign,
  },
  {
    title: "Cakes",
    value: "54",
    icon: Cake,
  },
  {
    title: "Customers",
    value: "89",
    icon: Users,
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-muted">
      
      {/* Sidebar */}
      <aside className="w-64 bg-background shadow-card p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-primary mb-8">
          SweetRose Admin
        </h2>

        <nav className="space-y-4">
          <a className="block text-foreground font-medium hover:text-primary cursor-pointer">
            Dashboard
          </a>
          <a className="block text-muted-foreground hover:text-primary cursor-pointer">
            Cakes
          </a>
          <a className="block text-muted-foreground hover:text-primary cursor-pointer">
            Orders
          </a>
          <a className="block text-muted-foreground hover:text-primary cursor-pointer">
            Customers
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Overview 🪻
          </h1>
          <p className="text-muted-foreground">
            Manage your bakery operations
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card p-6 rounded-2xl shadow-soft"
            >
              <item.icon className="text-primary mb-3" size={28} />
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <h3 className="text-2xl font-bold text-foreground">
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-background rounded-2xl shadow-card p-6">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            Recent Orders
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-sm">
                <th className="pb-3">Customer</th>
                <th className="pb-3">Cake</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: "Anna", cake: "Rose Velvet", status: "Delivered", total: "$45" },
                { name: "Mia", cake: "Berry Lilac", status: "Pending", total: "$38" },
                { name: "Lily", cake: "Ube Dream", status: "Processing", total: "$52" },
              ].map((order, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="py-3">{order.name}</td>
                  <td>{order.cake}</td>
                  <td className="text-primary">{order.status}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cake Management */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Manage Cakes 🎂
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="gradient-card p-5 rounded-2xl shadow-soft"
              >
                <div className="h-32 bg-muted rounded-xl mb-4"></div>
                <h3 className="font-bold text-foreground">Cake Name</h3>
                <p className="text-sm text-muted-foreground">
                  Short description
                </p>

                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 text-sm rounded-full bg-primary text-white">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm rounded-full border border-destructive text-destructive">
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;