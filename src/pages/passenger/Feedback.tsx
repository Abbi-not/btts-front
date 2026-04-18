import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Feedback submitted. Thank you!");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -left-20 animate-pulse-soft" />

      <div className="mb-8 animate-fade-up">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">
          <MessageSquare className="h-3 w-3" /> Contact
        </span>
        <h1 className="text-3xl font-serif font-bold text-foreground">Share your feedback</h1>
        <p className="text-sm text-muted-foreground mt-2">We'd love to hear about your experience.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 animate-fade-up stagger-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Topic" className="rounded-xl h-12 bg-background/50 border-border/40" required />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your feedback..." rows={5} className="rounded-xl bg-background/50 border-border/40" required />
          </div>
          <Button type="submit" className="w-full rounded-full h-12 shadow-elevated hover-lift">Submit Feedback</Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
