import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({ title: "Message Sent!", description: "We'll get back to you as soon as possible." });
    setFormData({ name: "", contact: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
    { icon: Phone, label: "Phone", value: "+254 700 000 000" },
    { icon: Mail, label: "Email", value: "sales@argoelectronics.co.ke" },
    { icon: Clock, label: "Hours", value: "Mon - Sat: 9AM - 6PM" },
  ];

  return (
    <section id="contact" className="py-24 scroll-mt-header">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="section-line" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Quote</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need a custom quote? Reach out to us and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12" />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium mb-2">Email or Phone</label>
                <Input id="contact" type="text" placeholder="john@example.com or +254..." value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required className="h-12" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <Textarea id="message" placeholder="I'm interested in..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="resize-none" />
              </div>
              <Button type="submit" className="w-full h-12 text-base rounded-full font-bold" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (<>Send Message <Send className="w-4 h-4 ml-2" /></>)}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <div className="p-6 rounded-xl bg-whatsapp/5 border border-whatsapp/15">
              <h4 className="font-bold mb-2">Prefer WhatsApp?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant responses by messaging us directly on WhatsApp.
              </p>
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground rounded-full font-bold">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
