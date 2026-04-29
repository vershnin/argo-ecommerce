import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="section-container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Get In Touch</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Have a question about a product or need help? Reach out and we'll respond within hours.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Phone, title: "Phone", info: "+254 700 000 000", href: "tel:+254700000000" },
          { icon: Mail, title: "Email", info: "info@argoelectronics.co.ke", href: "mailto:info@argoelectronics.co.ke" },
          { icon: MapPin, title: "Location", info: "Nairobi, Kenya", href: "#" },
        ].map(item => (
          <a key={item.title} href={item.href} className="rounded-xl border border-border bg-card p-6 text-center card-hover block">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.info}</p>
          </a>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="font-bold text-lg mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email / Phone</Label>
                <Input id="email" required />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g. Product inquiry" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} required placeholder="How can we help?" />
            </div>
            <Button type="submit" className="w-full rounded-full h-11" disabled={submitting}>
              <Send className="w-4 h-4 mr-2" />
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
