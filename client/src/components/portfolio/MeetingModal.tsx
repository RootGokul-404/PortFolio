import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, Mail, Send, User, X } from "lucide-react";
import { toast } from "sonner";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerEmail: string;
}

export function MeetingModal({ isOpen, onClose, developerEmail }: MeetingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [topic, setTopic] = useState("Technical Interview / Role Discussion");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) {
      toast.error("Please fill in your name, email, and preferred date.");
      return;
    }

    setIsSubmitted(true);
    toast.success("Meeting request dispatched successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-lg border border-white/10 bg-[#090d0b] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#c7ff40]" />
            <h3 className="font-display text-lg font-bold text-white">
              Schedule a Quick Interview / Discussion
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#c7ff40]/30 bg-[#c7ff40]/10 text-[#c7ff40]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="mt-4 font-display text-lg font-bold text-white">
              Meeting Request Transmitted!
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              Thank you, <strong className="text-white">{name}</strong>. A calendar invite confirmation has been dispatched for{" "}
              <strong className="text-[#c7ff40]">{date} at {time}</strong>.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-5 py-2 font-mono text-xs font-bold text-black hover:bg-[#d6ff66]"
            >
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-300 mb-1">YOUR NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recruiter or Engineering Lead"
                  className="w-full rounded-sm border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:border-[#c7ff40] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">YOUR EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full rounded-sm border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:border-[#c7ff40] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">PREFERRED DATE</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2 text-white focus:border-[#c7ff40] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">PREFERRED TIME</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0c120f] pl-9 pr-3 py-2 text-white focus:border-[#c7ff40] focus:outline-none"
                  >
                    <option>10:00 AM IST</option>
                    <option>11:30 AM IST</option>
                    <option>02:00 PM IST</option>
                    <option>04:30 PM IST</option>
                    <option>06:00 PM IST</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">DISCUSSION TOPIC</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-sm border border-white/10 bg-[#0c120f] px-3 py-2 text-white focus:border-[#c7ff40] focus:outline-none"
              >
                <option>Java Full Stack Developer Role</option>
                <option>Backend Engineering / Spring Boot Role</option>
                <option>Technical Screening / Coding Interview</option>
                <option>General Engineering Discussion</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#c7ff40] bg-[#c7ff40] py-2.5 font-mono text-xs font-bold text-black transition-all hover:bg-[#d6ff66]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>CONFIRM & DISPATCH INVITE</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
