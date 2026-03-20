import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-foreground">sweet<span className="text-primary">Rose</span></h3>
          <p className="text-sm text-muted-foreground mt-1">baked with 💜 & 🍰</p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/showcase" className="hover:text-primary transition-colors">Cakes</Link>
          <Link to="/special-orders" className="hover:text-primary transition-colors">Weddings</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2025 sweetRose · Artisanal Bakes · Signature Collections · dream</p>
      </div>
    </div>
  </footer>
);

export default Footer;
