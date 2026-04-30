import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Caller Release — Open Pod Talk",
  description:
    "Open Pod Talk's privacy policy and caller release agreement for show participants.",
};

const RELEASE_VERSION = "v1.0";
const LAST_UPDATED = "April 30, 2026";

export default function PrivacyPage() {
  return (
    <div className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,102,0,0.12),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#ffb380]/90 transition-colors hover:text-[#ff8533]"
        >
          ← Back home
        </Link>

        <h1 className="mt-6 font-[family-name:var(--font-opt)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Privacy Policy &amp; Caller Release
        </h1>
        <p className="mt-2 text-sm text-white/40">
          Last updated {LAST_UPDATED} &mdash; Release {RELEASE_VERSION}
        </p>

        <div className="mt-10 space-y-12 text-white/70 leading-relaxed">
          {/* --- Caller Release --- */}
          <section>
            <h2 className="font-[family-name:var(--font-opt)] text-xl font-bold text-white mb-4">
              Caller Release Agreement
            </h2>
            <div className="rounded-xl border border-[#ff6600]/25 bg-[#ff6600]/5 p-6 font-mono text-sm text-white/65 whitespace-pre-wrap leading-relaxed">
              {`CALLER RELEASE AGREEMENT — ${RELEASE_VERSION}

By submitting a topic form and/or appearing on Open Pod Talk, you ("Caller") grant Open Pod Talk, its hosts, producers, and assigns ("OPT") a perpetual, irrevocable, worldwide, royalty-free, sublicensable license to use, reproduce, edit, distribute, publicly perform, publicly display, and create derivative works from your name, likeness, voice, image, biographical information, and statements (collectively "Content") in all media and formats now known or hereafter developed, including but not limited to:

  • Audio and video podcast episodes and clips
  • Live and recorded streams on YouTube, Spotify, and other platforms
  • Social media clips and highlights
  • AI-assisted transcription, captioning, and indexing
  • Promotional and marketing materials

You waive any right to inspect or approve finished content prior to publication and waive any claims against OPT arising from such use, EXCEPT for the fabrication of statements you did not make or the knowing misrepresentation of your position.

You represent and warrant that: (a) you are at least 18 years of age; (b) you have the full right and authority to enter this agreement; (c) your appearance and statements do not infringe any third-party rights; and (d) you have obtained consent for any third parties you reference by name.

This agreement is governed by the laws of the jurisdiction in which OPT's principal host resides. Any dispute shall be resolved by binding arbitration under AAA rules. You waive any right to participate in a class action.

This agreement is entered into at the time you submit the caller form and/or verbally confirm consent on-air.`}
            </div>
          </section>

          {/* --- Privacy Policy --- */}
          <section>
            <h2 className="font-[family-name:var(--font-opt)] text-xl font-bold text-white mb-4">
              Privacy Policy
            </h2>

            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  Information we collect
                </h3>
                <p>
                  When you submit a caller topic we collect: your name, email address,
                  phone number (optional), location, timezone, social handles (optional),
                  topic details, and the source through which you heard about us. We also
                  record a hashed (one-way encrypted) version of your IP address and your
                  browser&apos;s user-agent string for spam prevention. We never store your
                  raw IP address.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  How we use your information
                </h3>
                <p>
                  We use your submission data solely to: review your topic for potential
                  inclusion in an episode, contact you if selected, send you a Riverside
                  studio link and tech-check instructions, and maintain an audit trail
                  of your consent for legal compliance purposes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  Data processors
                </h3>
                <p>
                  We use the following third-party services, each with their own privacy
                  policies:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-white/55">
                  <li>
                    <strong className="text-white/70">Supabase</strong> — database and
                    authentication (supabase.com/privacy)
                  </li>
                  <li>
                    <strong className="text-white/70">Vercel</strong> — website hosting
                    (vercel.com/legal/privacy-policy)
                  </li>
                  <li>
                    <strong className="text-white/70">Resend</strong> — transactional
                    email (resend.com/legal/privacy-policy)
                  </li>
                  <li>
                    <strong className="text-white/70">Cloudflare Turnstile</strong> —
                    spam prevention (cloudflare.com/privacypolicy)
                  </li>
                  <li>
                    <strong className="text-white/70">Riverside.fm</strong> — recording
                    studio for selected callers (riverside.fm/privacy)
                  </li>
                  <li>
                    <strong className="text-white/70">Upstash</strong> — rate limiting
                    (upstash.com/trust/privacy)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  Retention and deletion
                </h3>
                <p>
                  Submission data is retained for as long as necessary to fulfill the
                  purposes above or as required by law. To request deletion of your
                  submission data, email us at the address below. We will process
                  deletion requests within 30 days, subject to legal retention
                  obligations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  California &amp; state privacy rights
                </h3>
                <p>
                  If you are a California resident, you have rights under the CCPA
                  including the right to know, delete, and opt-out of sale. We do not
                  sell personal data. For requests, contact us below.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">
                  Recording consent — all-party states
                </h3>
                <p>
                  Twelve U.S. states require all-party consent for recording:
                  California, Connecticut, Delaware, Florida, Illinois, Maryland,
                  Massachusetts, Michigan, Montana, Nevada, New Hampshire, Pennsylvania,
                  and Washington. By submitting this form and appearing on the show, you
                  provide explicit consent to recording regardless of your state of
                  residence. This consent is captured at three points: (1) this written
                  agreement, (2) the confirmation email, and (3) verbal on-air
                  reconfirmation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white/85 mb-1">Contact</h3>
                <p>
                  For privacy requests or questions about this policy, email{" "}
                  <a
                    href="mailto:legal@openpodtalk.com"
                    className="text-[#ffb380] hover:underline"
                  >
                    legal@openpodtalk.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <Link
            href="/submit"
            className="inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a]"
          >
            Submit your topic
          </Link>
        </div>
      </div>
    </div>
  );
}
