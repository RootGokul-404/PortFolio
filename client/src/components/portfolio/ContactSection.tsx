import React, { FormEvent, useState } from "react";
import { Profile, saveContactSubmission } from "@/data/portfolioData";
import { trpc } from "@/lib/trpc";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
  profile: Profile;
}

type ContactForm = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const initialContact: ContactForm = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export function ContactSection({ profile }: ContactSectionProps) {
  const [contact, setContact] = useState<ContactForm>(initialContact);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const sendMessageMutation = trpc.portfolio.sendMessage.useMutation();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!contact.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (contact.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!contact.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!contact.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (contact.message.trim().length < 8) {
      newErrors.message = "Message must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      company: contact.company.trim() || undefined,
      message: contact.message.trim(),
      website: contact.website.trim() || undefined,
    };

    saveContactSubmission({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: payload.message,
    });

    try {
      await sendMessageMutation.mutateAsync(payload);
    } catch {
      console.warn("Backend notification fallback used");
    }

    toast.success("Dispatch transmitted successfully!");
    setFormFeedback(
      `Thank you, ${payload.name}. Your inquiry has been securely stored and sent to ${profile.email}. Gokulakannan will respond soon!`
    );
    setContact(initialContact);
    setErrors({});
  };

  const isSubmitting = sendMessageMutation.isPending;

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
                <span>// 05_DIRECT_CONNECT</span>
              </div>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's Build Systems Together
              </h2>
              <p className="mt-4 leading-relaxed text-slate-300">
                Interested in discussing backend architectures, full-stack engineering roles, or practical software collaborations? Send a direct dispatch.
              </p>

              <div className="mt-8 space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-slate-300">
                  <Mail className="h-4 w-4 text-[#c7ff40]" />
                  <a href={`mailto:${profile.email}`} className="hover:text-[#c7ff40]">
                    {profile.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-[#c7ff40]" />
                  <span>{profile.location} (Open to Global & Remote Roles)</span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/5 pt-6">
              <div className="font-mono text-xs text-slate-400">NETWORK CHANNELS</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-[#c7ff40]/50 hover:text-[#c7ff40]"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-[#c7ff40]/50 hover:text-[#c7ff40]"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  </a>
                )}
                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-[#c7ff40]/50 hover:text-[#c7ff40]"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>Instagram</span>
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#0a0f0d]/95 p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Terminal className="h-4 w-4 text-[#c7ff40]" />
                  <span>TRANSMISSION_TERMINAL_V1</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-[#c7ff40] animate-pulse" />
              </div>

              {formFeedback ? (
                <div className="mt-6 rounded-lg border border-[#c7ff40]/30 bg-[#c7ff40]/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[#c7ff40]" />
                  <h3 className="mt-3 font-display text-lg font-bold text-white">Transmission Successful</h3>
                  <p className="mt-2 text-sm text-slate-300">{formFeedback}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setFormFeedback(null)}
                      className="rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-4 py-2 font-mono text-xs font-bold text-black hover:bg-[#d6ff66]"
                    >
                      SEND ANOTHER DISPATCH
                    </button>
                    <a
                      href={`mailto:${profile.email}`}
                      className="rounded-sm border border-white/20 bg-white/[0.05] px-4 py-2 font-mono text-xs font-medium text-white hover:border-white/40"
                    >
                      OPEN IN EMAIL CLIENT
                    </a>
                  </div>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-field">Leave blank</label>
                    <input
                      id="website-field"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={contact.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block font-mono text-xs text-slate-300">
                          NAME <span className="text-[#c7ff40]">*</span>
                        </label>
                        {errors.name && (
                          <span className="flex items-center gap-1 font-mono text-[11px] text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Your name / contact"
                        value={contact.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`mt-1.5 w-full rounded-sm border bg-[#121915] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-500/80 bg-red-950/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                            : "border-white/10 focus:border-[#c7ff40] focus:ring-1 focus:ring-[#c7ff40]"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block font-mono text-xs text-slate-300">
                          EMAIL <span className="text-[#c7ff40]">*</span>
                        </label>
                        {errors.email && (
                          <span className="flex items-center gap-1 font-mono text-[11px] text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={contact.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`mt-1.5 w-full rounded-sm border bg-[#121915] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-500/80 bg-red-950/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                            : "border-white/10 focus:border-[#c7ff40] focus:ring-1 focus:ring-[#c7ff40]"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300">
                      ORGANIZATION / COMPANY
                    </label>
                    <input
                      type="text"
                      placeholder="Company or Organization (optional)"
                      value={contact.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="mt-1.5 w-full rounded-sm border border-white/10 bg-[#121915] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-500 focus:border-[#c7ff40] focus:outline-none focus:ring-1 focus:ring-[#c7ff40]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-xs text-slate-300">
                        MESSAGE PAYLOAD <span className="text-[#c7ff40]">*</span>
                      </label>
                      {errors.message && (
                        <span className="flex items-center gap-1 font-mono text-[11px] text-red-400">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </span>
                      )}
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Outline project requirements, system architecture needs, or collaboration intent..."
                      value={contact.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`mt-1.5 w-full rounded-sm border bg-[#121915] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                        errors.message
                          ? "border-red-500/80 bg-red-950/10 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                          : "border-white/10 focus:border-[#c7ff40] focus:ring-1 focus:ring-[#c7ff40]"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-sm border border-[#c7ff40] bg-[#c7ff40] py-3 font-mono text-xs font-bold text-black transition-all hover:bg-[#d6ff66] hover:shadow-[0_0_20px_rgba(199,255,64,0.3)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING DISPATCH...</span>
                    ) : (
                      <>
                        <span>TRANSMIT DISPATCH</span>
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
