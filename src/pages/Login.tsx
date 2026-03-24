import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { RegisterData } from "@/types/authTypes";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: RegisterData = {
      userName: name,
      email: email,
      whatsAppNumber: whatsAppNumber,
      password: password,
    };

    try {
      if (isSignup) {
        if (password !== confirmPassword)
          return toast({
            title: "Password does not match.",
            description: "Check your password",
            variant: "default",
          });

        await signup(data);
        setIsSignup(false);
        toast({
          title: "Account created successfully",
          description: "You can now log in with your credentials",
          variant: "default",
        });
      } else {
        await login(email, password);
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center gradient-hero py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-background rounded-3xl shadow-elevated p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {isSignup ? "Create Account" : "Welcome Back"} 🪻
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isSignup
                ? "Join the sweetRose family"
                : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignup && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                minLength={4}
                pattern="[A-Za-z ]+"
                title="Name should contain only letters"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {isSignup && (
              <input
                required={isSignup}
                type="tel"
                placeholder="WhatsApp Number"
                value={whatsAppNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setWhatsAppNumber(value);
                }}
                className="px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {isSignup && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={isSignup}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity mt-2"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary font-semibold hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
