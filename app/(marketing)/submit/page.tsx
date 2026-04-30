import type { Metadata } from "next";
import { SubmissionForm } from "./SubmissionForm";

export const metadata: Metadata = {
  title: "Call In — Open Pod Talk",
  description:
    "Submit your topic to be a caller on Open Pod Talk. If selected, we'll send you a studio link and get you on air.",
};

export default function SubmitPage() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 pb-24 pt-12 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,102,0,0.18),transparent)]" />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <a
          href="/"
          className="text-sm font-medium text-[#ffb380]/90 transition-colors hover:text-[#ff8533]"
        >
          ← Back home
        </a>
        <h1 className="mt-6 font-[family-name:var(--font-opt)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Call in to Open Pod Talk
        </h1>
        <p className="mt-4 leading-relaxed text-white/65">
          Have a story, debate, question, or hot take? Submit your topic below.
          We read every submission. Selected callers get a Riverside studio link
          and a 10-minute tech check before going live.
        </p>
        <div className="mt-6 rounded-xl border border-[#ff6600]/30 bg-[#ff6600]/10 p-4 text-sm leading-relaxed text-[#ffb380]">
          <strong className="text-[#ffa64d]">Tech requirements:</strong> Chrome
          or Edge on a desktop/laptop, wired headphones, 10+ Mbps upload, quiet
          room. Firefox, Safari, mobile browsers, and Bluetooth headphones are
          not supported.
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:p-10">
          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
