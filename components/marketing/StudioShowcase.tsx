import Image from "next/image";

const SUPPORT_PHOTOS = [
  {
    src: "/studio-wall-politics-sign.png",
    alt: "Studio wall art including politics heart sign, UFO poster, Johnny Cash print, and agree to disagree peacefully sign",
    caption: "Agree to disagree — peacefully",
  },
  {
    src: "/studio-bento-neon.png",
    alt: "Studio accent wall with posters and signs behind the set",
    caption: "The accent wall",
  },
  {
    src: "/open-pod-talk-entrance.png",
    alt: "Entrance to the Open Pod Talk studio",
    caption: "Walk-ins start here",
  },
] as const;

export function StudioShowcase() {
  return (
    <section id="studio" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header — heading left, copy right */}
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-end">
          <div>
            <p className="opt-eyebrow">The studio</p>
            <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
              Built for the back-and-forth
            </h2>
          </div>
          <p className="text-base leading-relaxed text-white/55 lg:pb-1">
            Your topic gets turned into a real exchange. No script or prep —
            just the mic and whatever you came to say.
          </p>
        </div>

        {/* Feature image — two chairs, wide and cinematic */}
        <figure className="group relative mt-10 overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/[0.04]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[16/7]">
            <Image
              src="/studio-bento-conversation.png"
              alt="Open Pod Talk studio with two leather chairs facing each other for conversation"
              fill
              sizes="(max-width: 1152px) 100vw, 1104px"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm sm:bottom-5 sm:left-5">
            Two chairs. No script.
          </figcaption>
        </figure>

        {/* Supporting row */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
          {SUPPORT_PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/[0.04]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <figcaption className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-widest text-white/70">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
