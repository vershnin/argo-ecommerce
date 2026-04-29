import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const trustFeatures = [
  { icon: Truck, label: "Fast Delivery" },
  { icon: Shield, label: "Secure Payment" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: RotateCcw, label: "Easy Returns" },
];

export function StoreFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Shop Categories */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Argo<span className="text-primary">.</span></span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-6">
              Authorized retailer for premium consumer electronics in Nairobi. Quality products, competitive prices, genuine warranty.
            </p>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop Categories</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><Link to="/shop?category=audio" className="hover:text-primary transition-colors">Audio & Headphones</Link></li>
              <li><Link to="/shop?category=wearables" className="hover:text-primary transition-colors">Wearables</Link></li>
              <li><Link to="/shop?category=gaming" className="hover:text-primary transition-colors">Gaming</Link></li>
              <li><Link to="/shop?category=computing" className="hover:text-primary transition-colors">Computing</Link></li>
              <li><Link to="/shop?category=cameras" className="hover:text-primary transition-colors">Cameras</Link></li>
              <li><Link to="/shop?category=chargers" className="hover:text-primary transition-colors">Chargers & Power</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><Link to="/account" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Warranty Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm text-background/60">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-background/80">Visit Us</p>
                  <p className="leading-relaxed">Nairobi, Kenya</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-background/80">Call Us</p>
                  <p className="leading-relaxed">+254 700 000 000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-background/80">Email Us</p>
                  <p className="leading-relaxed">info@argoelectronics.co.ke</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-background/5 border border-background/10">
              <p className="text-xs text-background/50 mb-2">Business Hours</p>
              <p className="text-sm font-medium">Mon — Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-sm text-background/60">Sun: 11:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-14 pt-8 border-t border-background/10">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustFeatures.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2.5 text-background/50">
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Argo Electronics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

