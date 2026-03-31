import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { User, Phone, MapPin, Mail } from "lucide-react";
import { UpdateUserData } from "@/types/authTypes";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, updateProfile, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user && !isEditing) {
      setName(user.name);
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user, isEditing]);

  if (!isAuthenticated || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  const data: UpdateUserData = {
    userName: name,
    email: email,
    whatsAppNumber: phone
  }

  try {
    const message = await updateProfile(data);
    setSaved(true);
    setIsEditing(false);

    toast({
      title: "Success",
      description: message || "User updated successfully",
      variant: "default"
    });

    setTimeout(() => setSaved(false), 2000);
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Update failed";

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
  }
};

  if (loading) return <div>Loading...</div>;

  return (
    <section className="min-h-[80vh] gradient-hero py-20">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background rounded-3xl shadow-elevated p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold text-foreground">
                Your Profile
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  setName(user.name);
                  setPhone(user.phone || "");
                  setEmail(user.email || "");
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-3 py-1 text-xs font-bold rounded-full border border-border hover:bg-muted"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center mb-4">
              <User size={28} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                disabled={!isEditing}
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="tel"
                required
                disabled={!isEditing}
                placeholder="Phone"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPhone(e.target.value);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                required
                disabled
                placeholder="Emal address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              disabled={!isEditing} // disable unless editing
              className={`w-full py-3 rounded-full gradient-primary text-primary-foreground font-bold mt-2 ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </form>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
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
