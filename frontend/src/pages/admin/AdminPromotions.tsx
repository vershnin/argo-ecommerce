import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/stores/adminStore";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";
import { PromoCode } from "@/types/product";

export default function AdminPromotions() {
  const { promoCodes, addPromoCode, updatePromoCode, deletePromoCode } = useAdminStore();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    code: "", type: "percentage" as PromoCode["type"], value: 0, minOrder: 0, expiresAt: "2026-12-31",
  });

  const handleAdd = () => {
    if (!form.code) {
      toast({ title: "Code is required", variant: "destructive" });
      return;
    }
    if (promoCodes.some((p) => p.code.toUpperCase() === form.code.toUpperCase())) {
      toast({ title: "Code already exists", variant: "destructive" });
      return;
    }
    addPromoCode({
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      expiresAt: form.expiresAt,
      active: true,
    });
    setDialogOpen(false);
    setForm({ code: "", type: "percentage", value: 0, minOrder: 0, expiresAt: "2026-12-31" });
    toast({ title: "Promo code created" });
  };

  const toggleActive = (code: string, active: boolean) => {
    updatePromoCode(code, { active });
    toast({ title: `Promo ${code} ${active ? "activated" : "deactivated"}` });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Promotions</h1>
          <p className="text-muted-foreground">{promoCodes.length} promo codes</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Promo Code
        </Button>
      </div>

      <div className="space-y-3">
        {promoCodes.map((promo) => (
          <div key={promo.code} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-foreground">{promo.code}</span>
                  <Badge variant={promo.active ? "default" : "secondary"}>
                    {promo.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {promo.type === "percentage" ? `${promo.value}% off` : `${formatPrice(promo.value)} off`}
                  {promo.minOrder ? ` · Min order ${formatPrice(promo.minOrder)}` : ""}
                  {` · Expires ${promo.expiresAt}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={promo.active} onCheckedChange={(v) => toggleActive(promo.code, v)} />
              <Button variant="ghost" size="icon" onClick={() => { deletePromoCode(promo.code); toast({ title: "Promo deleted" }); }} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Promo Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Code</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. SUMMER20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as PromoCode["type"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Order (KSH)</Label>
                <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Expires</Label>
                <Input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Create Code</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
