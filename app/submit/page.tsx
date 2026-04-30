import type { Metadata } from "next";
import { SubmissionForm } from "./SubmissionForm";

export const metadata: Metadata = {
  title: "Call In — OpenPodTalk",
  description:
    "Submit your topic to be a caller on OpenPodTalk. If selected, we'll send you a studio link and get you on air.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="mb-10">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← OpenPodTalk
          </a>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Call in to OpenPodTalk
          </h1>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Have a story, debate, question, or hot take? Submit your topic below.
            We read every submission. Selected callers get a Riverside studio link
            and a 10-minute tech check before going live.
          </p>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
            <strong>Tech requirements:</strong> Chrome or Edge on a desktop/laptop,
            wired headphones, 10+ Mbps upload, quiet room. Firefox, Safari, mobile
            browsers, and Bluetooth headphones are not supported.
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
