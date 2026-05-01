import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitReview } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Review } from "@/types/product";

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: (review: Review) => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Rating required", description: "Please select a rating", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const review = await submitReview(productId, { rating, title, comment });
      toast({ title: "Review submitted", description: "Thank you for your feedback!" });
      onReviewSubmitted(review);
      setTitle("");
      setComment("");
      setRating(5);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary/30 p-6 rounded-xl border border-border">
      <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2 block">Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Review Title</Label>
          <Input
            id="title"
            placeholder="Sum up your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Detailed Comment</Label>
          <Textarea
            id="comment"
            placeholder="What did you like or dislike?"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
